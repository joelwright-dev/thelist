import prisma from "@/lib/prisma"

import Navbar from "@/components/Navbar";
import { ActionIcon, Button, Checkbox, Input, Stack, Table, Group } from "@mantine/core";
import { IconPlus, IconTrash, IconX, IconCheck, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";

export async function getServerSideProps({ params }) {
    const categories = await prisma.category.findMany();

    const id = params.id

    const items = await prisma.item.findMany({
        where: {
            categoryId: Number(id)
        }
    })

    console.log(items, categories)

    return { 
        props: { 
            items: JSON.parse(JSON.stringify(items)),
            categories: JSON.parse(JSON.stringify(categories)),
            id: JSON.parse(JSON.stringify(id))
        }
    }
}

export default function Page({ items, categories, id }) {
    const [addNew, setAddNew] = useState(false)

    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            status: false
        }
    })
    
    return (
        <Navbar categories={categories}>
            <Stack>
                <form onSubmit={form.onSubmit((values) => {
                    values.id = Number(id)
                    fetch("/api/newItem", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    }).then((response) => {console.log(response)})
                })}>
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
                            {items.map((item) => (
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
                </form>
                <Button leftSection={<IconPlus size="1rem" stroke={1.5}/>} onClick={() => setAddNew(true)}>Add Item</Button>
            </Stack>
        </Navbar>
    )
}