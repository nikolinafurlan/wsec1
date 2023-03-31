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

  return (
    <NextUIProvider>
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