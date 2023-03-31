
import {useRouter} from 'next/router'
import { NextUIProvider } from '@nextui-org/react';
import { Input } from "@nextui-org/react";
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import { Button, Grid, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import {  createTheme } from '@nextui-org/react';
import { Table } from '@nextui-org/react';

export default function ListAllCourses({data}) {

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

              {/** Midle card */}
              <Card css={{ h: '500px', $$cardColor: '#ffffff' }}>
        <Card.Body>

          {/** Begin Table */}
            <Table
            aria-label="Example table with static content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            >
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column>Title</Table.Column>
              <Table.Column>Description </Table.Column>
              <Table.Column>NFQ </Table.Column>
              <Table.Column>Year </Table.Column>
              <Table.Column>Option </Table.Column>
            </Table.Header>

            <Table.Body>
              <Table.Row key="1">
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
                    <Table.Cell>{item.title} </Table.Cell>
                    <Table.Cell>{item.desc} </Table.Cell>
                    <Table.Cell>{item.nfq} </Table.Cell>
                    <Table.Cell>{item.courseyear} </Table.Cell>
                    <Table.Cell>
                      <Link href={`/viewAll?id=` + item.id}>View</Link>
                    </Table.Cell>
                  </Table.Row>
                ))
                }

              </Table.Body>
          </Table>

          {/** End Table */}

        </Card.Body>
        </Card>
                {/** Bottom card */}
                <Card css={{ h: '$24', width: '100%', $$cardColor: '$colors$primary' }}>
                    <Card.Body>
                    <Text h6 size={15} color="white" css={{ mt: 0 }}>
                    <Link href="http://localhost:3000/listAllStudents">
                    List all students    </Link>
                    <Link href="http://localhost:3000/listAllGrades">
                    List all grades    </Link>


                    </Text>
                    </Card.Body>
                </Card>

    </NextUIProvider>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/listCourses`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}