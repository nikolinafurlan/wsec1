import {useRouter} from 'next/router'
import { NextUIProvider } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Container, Card, Row, Text, Col, Spacer, Textarea } from "@nextui-org/react";
import { Button, Grid, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import {  createTheme } from '@nextui-org/react';
import { Table } from '@nextui-org/react';

export default function Chat() {

  async function handleSubmit(event) {

  event.preventDefault();

        //Get date from the form
        const data = {

        username: event.target.username.value,
        comment: event.target.comment.value,
          
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        alert(JSONdata);

        // API endpoint where we send form data.
        const endpoint = '/api/saveChat';


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
        const result = await response.json()

        alert ('response from server' + result);

  }

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


  async function callChatPage(){

           // Form the request for sending data to the server.
           const options = {
            // The method is POST because we are sending data.
            method: 'GET',
            // Tell the server we're sending JSON.
            headers: {
              'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: '',
          };
  
          // Send the form data to our forms API on Vercel and get a response.
          const response = await fetch('api/getChats', options);
        
          // Get the response data from server as JSON.
          // If server returns the name submitted, that means the form works.
          const result = await response.json()
  
          //stick the resposne into chat window
          console.log("chat page result: + result");

          document.getElementById('chatlog').value = result;
  }

   //run the interval hook
   setInterval(() => {
   console.log('Interval triggered');
   }, 1000);

   callChatPage();



    return (
            <NextUIProvider theme={myCustomTheme}>
              {/** Logo to appear on top */}
              <Image width={320} height={180} src="atlaslogo.png" alt="def image" />
        
              {/** Top card */}
              <Card css={{ h: '$24', width: '100%', $$cardColor: '$colors$primary' }}>
                <Card.Body>
                  <Text h6 size={15} color="white" css={{ mt: 0 }}>
                    Top
                  </Text>
                </Card.Body>
              </Card> 

              {/** Midle card */}
              <Card css={{ h: '500px', $$cardColor: '#ffffff' }}>
                
             <Card.Body>

             <Textarea 
             label="Chat log"
             placeholder=""
             id="chatlog"
             />


              <Spacer y={1.6} />


              <form onSubmit={handleSubmit}>
                Username:
                <Input
                          id="username"
                          labelPlaceholder=""
                          width = "300px"
                          initialValue=""
                  />
                <Spacer y={1.6} />

                Your comment:
                <Input
                          id="comment"
                          labelPlaceholder=""
                          width = "300px"
                          initialValue=""
                  />

                <Spacer y={1.6} />
  
                <Button type="submit" color="secondary" width="300px">
                          Send
                </Button>


              </form>


            </Card.Body>

             </Card>
                {/** Bottom card */}
                <Card css={{ h: '$24', width: '100%', $$cardColor: '$colors$primary' }}>
                    <Card.Body>
                    <Text h6 size={15} color="white" css={{ mt: 0 }}>
                        Bottom
                    </Text>
                    </Card.Body>
                </Card>

    </NextUIProvider>
  );
}

