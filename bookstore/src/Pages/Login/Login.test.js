import React from 'react';
// import { shallow, mount } from 'enzyme';
import Login from './Login';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../Services/user_service';
import toast from 'react-hot-toast';

// Mock necessary imports
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../Services/user_service', () => ({
  userLogin: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

describe('Login Component', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  it('should render the Login component', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle form input changes', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('TextField[name="email"]').simulate('change', { target: { name: 'email', value: 'test@example.com' } });
    wrapper.find('TextField[name="password"]').simulate('change', { target: { name: 'password', value: 'Password1!' } });

    expect(wrapper.find('TextField[name="email"]').prop('value')).toBe('test@example.com');
    expect(wrapper.find('TextField[name="password"]').prop('value')).toBe('Password1!');
  });

  it('should show error messages if validation fails', async () => {
    const wrapper = shallow(<Login />);
    
    // Simulate form submission
    await wrapper.find(Button).simulate('click', { preventDefault: () => {} });

    // Check if error messages are displayed
    expect(wrapper.find('TextField[name="email"]').prop('error')).toBe(true);
    expect(wrapper.find('TextField[name="email"]').prop('helperText')).toBe('Please enter a valid email');
    expect(wrapper.find('TextField[name="password"]').prop('error')).toBe(true);
    expect(wrapper.find('TextField[name="password"]').prop('helperText')).toBe('Incorrect password');
  });

  it('should call userLogin and navigate on successful login', async () => {
    userLogin.mockResolvedValue({ data: { result: { accessToken: 'dummyToken' } } });

    const wrapper = mount(<Login />);
    wrapper.find('TextField[name="email"]').simulate('change', { target: { name: 'email', value: 'test@example.com' } });
    wrapper.find('TextField[name="password"]').simulate('change', { target: { name: 'password', value: 'Password1!' } });

    await wrapper.find(Button).simulate('click', { preventDefault: () => {} });

    expect(userLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Password1!' });
    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should display a toast error message on login failure', async () => {
    userLogin.mockRejectedValue(new Error('Login failed'));

    const wrapper = mount(<Login />);
    wrapper.find('TextField[name="email"]').simulate('change', { target: { name: 'email', value: 'test@example.com' } });
    wrapper.find('TextField[name="password"]').simulate('change', { target: { name: 'password', value: 'Password1!' } });

    await wrapper.find(Button).simulate('click', { preventDefault: () => {} });

    expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
  });
});
