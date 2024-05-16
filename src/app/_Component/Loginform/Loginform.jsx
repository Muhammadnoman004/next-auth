import React, { useState } from 'react';
import { signIn } from 'next-auth/react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

const Loginform = () => {

    const router = useRouter()
    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 3000);
    };

    const handleSubmit = async (values) => {
        try {
            console.log('Received values of form: ', values);
            const response = await signIn('credentials', {
                username: values.username,
                password: values.password,
                redirect: false

            })
            if (response.status === 200) {
                alert("login Successfuly")
                router.replace('/Home')
            }
            else {

                alert("Invalid credentials!")
            }

        } catch (error) {
            console.error(error);

        }
    };

    return (
        <>
            <Flex justify='center' gap="middle" align='center' className='h-screen' vertical style={{ backgroundColor: "gainsboro" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Login</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block
                            onClick={() => enterLoading(1)}
                            loading={loadings[1]}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    );
};
export default Loginform;
