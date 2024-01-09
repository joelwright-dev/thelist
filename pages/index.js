
import prisma from "../lib/prisma";
import { Stack, Table, Checkbox, ActionIcon, Input, Title, Button, Group, NavLink } from "@mantine/core";
import { IconTrash, IconX, IconPlus, IconCheck, IconPencil, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";

export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  const allData = await prisma.category.findMany({
    select: {
      name: true,
      description: true,
      id: true,
      items: true
    }
  })

  console.log(allData)

  return {
    props: { 
      categories: JSON.parse(JSON.stringify(categories)),
      allData: JSON.parse(JSON.stringify(allData))
    },
  };
}

import Navbar from "@/components/Navbar";

export default function HomePage({ categories, allData }) {
  const [addNew, setAddNew] = useState(false)

  const form = useForm({
      initialValues: {
          name: "",
          description: "",
          status: false
      }
  })
  
  return (
    <>
      <Navbar categories={categories}>
      <Stack>
          {allData.map((category) => (
            <form onSubmit={form.onSubmit((values) => {
              values.id = Number(category.id)
              fetch("/api/newItem", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(values)
              }).then((response) => {console.log(response)})
            })}>
              <Stack>
                <NavLink href={`category/${category.id}`} label={category.name} rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}/>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {category.items.map((item) => (
                        <Table.Tr key={item.id}>
                            <Table.Td>{item.name}</Table.Td>
                            <Table.Td>{item.description}</Table.Td>
                            <Table.Td><Checkbox checked={false}/></Table.Td>
                            <Table.Td>
                              <Group>
                                <ActionIcon><IconPencil size="1rem" stroke={1.5}/></ActionIcon>
                                <ActionIcon color="red" onClick={() => {
                                    fetch("/api/deleteItem", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({id: item.id})
                                    }).then((response) => {console.log(response)})
                                }}><IconTrash size="1rem" stroke={1.5}/></ActionIcon>
                              </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                    {addNew ? (
                      <Table.Tr>
                              <Table.Td><Input {...form.getInputProps("name")}/></Table.Td>
                              <Table.Td><Input {...form.getInputProps("description")}/></Table.Td>
                              <Table.Td><Checkbox {...form.getInputProps("status", {type: "checkbox"})}/></Table.Td>
                              <Table.Td>
                                  <Group>
                                      <ActionIcon type="submit"><IconCheck size="1rem" stroke={1.5}/></ActionIcon>
                                      <ActionIcon color="red" onClick={() => setAddNew(false)}><IconX size="1rem" stroke={1.5}/></ActionIcon>
                                  </Group>
                              </Table.Td>
                      </Table.Tr>) : <></>}
                  </Table.Tbody>
                </Table>
                <Button leftSection={<IconPlus size="1rem" stroke={1.5}/>} onClick={() => setAddNew(true)}>Add Item</Button>
              </Stack>
            </form>
          ))}
        </Stack>
      </Navbar>
    </>
  );
}