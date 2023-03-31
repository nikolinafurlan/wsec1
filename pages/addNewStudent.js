import { useState } from 'react';
import { Input } from "@nextui-org/react";
import {  createTheme } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import { Button, Grid, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";


export default function AddStudentForm() {

  /**********CUSTOM THEME */
  const myCustomTheme = createTheme({
    type: 'light', // it could be "light" or "dark"
    theme: {
      colors: {
        // brand colors
        primaryLight: '$green200',
        primaryLightHover: '$green300',
        primaryLightActive: '$green400',
        primaryLightContrast: '$green600',
        primary: '#d8d8d8',
        primaryBorder: '$green500',
        primaryBorderHover: '$green600',
        primarySolidHover: '$green700',
        primarySolidContrast: '$white',
        primaryShadow: '$green500',

        gradient:
          'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
        link: '#5E1DAD',

        // you can also create your own color
        myColor: '#ff4ecd',

        // ...  more colors
      },
      space: {},
      fonts: {},
    },
  });


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    telephone: "",
    enrolledIn: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        telephone: "",
        enrolledIn: ""
      });

      alert('Student added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add student. Please try again later.');
    }
  };

  return (

    <NextUIProvider theme={myCustomTheme}>

              {/** Logo to appear on top */}
              <Image width={320} height={180} src="atlaslogo.png" alt="def image" />
        
              {/** Top card */}
              <Card css={{ h: '$24', width: '100%', $$cardColor: '$colors$primary' }}>
                <Card.Body>
                  <Text h6 size={15} color="white" css={{ mt: 0 }}>
                    NEW STUDENT REGISTRATION
                  </Text>
                </Card.Body>
              </Card> 

              {/** Midle card */}
              <Card css={{ h: '500px', $$cardColor: '#ffffff' }}>
             <Card.Body>

                <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                />
                <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                />
                <Input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="Telephone"
                    required
                />
                <Input
                    type="text"
                    name="enrolledIn"
                    value={formData.enrolledIn}
                    onChange={handleInputChange}
                    placeholder="Enrolled In"
                    required
                />
                
                <Spacer y={1.2} />

                <Button type="submit">Add Student</Button>
                </form>
                </Card.Body>
              </Card> 

       {/** Bottom card */}
       <Card css={{ h: '$24', width: '100%', $$cardColor: '$colors$primary' }}>
            <Card.Body>
            <Text h6 size={15} color="white" css={{ mt: 0 }}>
            <Link href="http://localhost:3000/listAllStudents">
            GO BACK TO LIST OF ALL STUDENTS    </Link>
            </Text>
            </Card.Body>
            </Card>
    </NextUIProvider>

  );
}