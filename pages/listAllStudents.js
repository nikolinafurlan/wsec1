import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import { Button, Grid, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { createTheme } from '@nextui-org/react';
import { Table } from '@nextui-org/react';

export default function ListAllStudents({ data }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    const res = await fetch(`/api/deleteStudent?id=${id}`, {
      method: 'DELETE',
    });
    setIsLoading(false);

    if (res.ok) {
      router.reload();
    } else {
      console.error('Failed to delete student');
    }
  };

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

      {/* Middle card */}
      <Card css={{ h: '500px', $$cardColor: '#ffffff' }}>
        <Card.Body>
          {/* Begin Table */}
          <Table
            aria-label="Example table with static content"
            css={{
              height: 'auto',
              minWidth: '100%',
            }}
          >
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column>First name</Table.Column>
              <Table.Column>Last Name </Table.Column>
              <Table.Column>Email </Table.Column>
              <Table.Column>Address </Table.Column>
              <Table.Column>Telephone </Table.Column>
              <Table.Column>Enrolled in course: </Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {data &&
                data.map((item) => (
                  // print out the table from the JSON we got
                  // from the API
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{item.firstname}</Table.Cell>
                    <Table.Cell>{item.lastname}</Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell>{item.telephone}</Table.Cell>
                    <Table.Cell>{item.enrolledin}</Table.Cell>
                    <Table.Cell>
                      <Button
                        auto
                        loading={isLoading}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          {/* End Table */}
        </Card.Body>
      </Card>
       {/** Bottom card */}
       <Card css={{ h: '$24', width: '100%', $$cardColor: '$colors$primary' }}>
            <Card.Body>
            <Text h6 size={15} color="white" css={{ mt: 0 }}>
            <Link href="http://localhost:3000/addNewStudent">
            REGISTER NEW STUDENT HERE    </Link>
            </Text>
            </Card.Body>
            </Card>
    </NextUIProvider>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/listStudents`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}