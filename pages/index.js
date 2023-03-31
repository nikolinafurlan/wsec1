
import {useRouter} from 'next/router'
import { NextUIProvider } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import { Button, Grid } from "@nextui-org/react";
import { Link } from "@nextui-org/react";


export default function Home({data}) {

async function handleSubmit(event) {
  alert('The form was submitted');
  event.preventDefault(); //block def behaviour

   // grab the variables from the form.
    const name = document.querySelector('#username').value;

    console.log('username is ' + name);

    const pass = document.querySelector('#password').value;

    console.log('password is ' + pass);

    // Get data from the form.
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = '/api/login';
    
      // Form the request for sending data to the server.
      const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        };
    
      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);
    
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json();
      alert(`server result: ${result}`);
    
      router.push('/listAllCourses');
  }


  const router = useRouter()

  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$24", $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

  return (

    <NextUIProvider>
    <Grid.Container gap={2} justify="center">
      <Grid xs={4}>
        <MockItem text="1 of 3" />
      </Grid>

      <Grid xs={4}>

        <Card css={{ h: "$248", $$cardColor: '$colors$primary' }}>
          <Card.Body>
            <Text h6 size={15} color="white" css={{ mt: 0 }}>
            Login to system
            <br></br>
            <form onSubmit={handleSubmit}>

                  <Input
                          id="username"
                          labelPlaceholder="Username"
                          initialValue=""
                  />
                  <Spacer y={0.5} />
                  <Input
                          id="password"
                          labelPlaceholder="Password"
                          initialValue=""
                    />
                    <Spacer y={0.5} />
                    <Button type="submit" color="secondary" auto>
                          Login
                    </Button>

            </form>
            </Text>
          </Card.Body>
        </Card>

      </Grid>

      <Grid xs={4}>
        <MockItem text="3 of 3" />
      </Grid>
    </Grid.Container>

    </NextUIProvider>
    
  )
}


