import Link from 'next/link'
import { Table } from '@nextui-org/react';
import { useRouter } from 'next/router'
import { Input } from "@nextui-org/react";
import { Button, Grid } from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react"
import {  createTheme } from '@nextui-org/react';

export default function ViewAll({data, courseid}) {


    // if we want to redirect the user
    const router = useRouter()

    // if we want to get a parameter from the URL such as
    // the ID.
    const {cid} = router.query

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



  //Sending back main UI
  return (

    <NextUIProvider theme={myCustomTheme}>

    Hello there! 
    Current course ID is: {courseid}

    {/** Start Table */}
    <Table
            aria-label="Example table with static content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            >
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column>Grade</Table.Column>
              <Table.Column>Firstname</Table.Column>
              <Table.Column>Lastname </Table.Column>
              <Table.Column>Email </Table.Column>
              <Table.Column>Address </Table.Column>
              <Table.Column>Telephone </Table.Column>
              <Table.Column>Enrolled in </Table.Column>
            </Table.Header>

            <Table.Body>
              <Table.Row key="1">
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>

              </Table.Row>

              {data &&
                data.map((item, i) => (
                  // print out the table from the JSON we got
                  // from the API

                  <Table.Row key="1">
                    <Table.Cell>{item.id} </Table.Cell>
                    <Table.Cell>
                    <Input id={`grade_`+item.id}   labelPlaceholder={`grade_`+item.id}/>
                    <Button type="button" onClick={(save) => saveData(item.id, courseid)}  size="xs">Save</Button>

                    </Table.Cell>
                    <Table.Cell>{item.firstname} </Table.Cell>
                    <Table.Cell>{item.lastname} </Table.Cell>
                    <Table.Cell>{item.email} </Table.Cell>
                    <Table.Cell>{item.address} </Table.Cell>
                    <Table.Cell>{item.telephone} </Table.Cell>
                    <Table.Cell>{item.enrolledin} </Table.Cell>
                  </Table.Row>
                ))
                }

            </Table.Body>
    </Table>

    {/** End Table */}

    </NextUIProvider>
  );
  
   /* ************************** SUBMIT HANDLER *************************/
   async function saveData(id, courseid) {

   let gradeValue = document.getElementById('grade_'+id).value;
   
   alert(id + " " + gradeValue+" "+courseid);

      // Get data from the form.
      const data = {
        id: id,
        grade: gradeValue,
        cid: courseid

      }
  
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
  
        // API endpoint where we send form data.
        const endpoint = '/api/saveGrade';
      
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

        alert ('Saved');
      
    }
  
/* **************END HANDLE SUBMIT */
   
}

export async function getServerSideProps(context) {
    let id = context.query.id;
    let courseid = context.query.id;
    console.log("current id" + id);
  
    const res = await fetch(`http://localhost:3000/api/getEnrolledStudents?id=`+id);
    const data = await res.json()
  
    return {
      props: { data,courseid }, // will be passed to the page component as props
    }
  }
  