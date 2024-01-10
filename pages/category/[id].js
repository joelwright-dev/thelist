import prisma from "@/lib/prisma"

import Navbar from "@/components/Navbar";
import { ActionIcon, Button, Checkbox, Input, Stack, Table, Group, NavLink } from "@mantine/core";
import { IconPlus, IconTrash, IconX, IconCheck, IconPencil, IconCake, IconCamera, IconVideo, IconHeart } from "@tabler/icons-react";
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

    const category = await prisma.category.findUnique({
        where: {
            id: Number(id)
        }
    })

    if(!category) {
        return {
            notFound: true
        }
    }

    return { 
        props: { 
            items: JSON.parse(JSON.stringify(items)),
            categories: JSON.parse(JSON.stringify(categories)),
            category: JSON.parse(JSON.stringify(category)),
            id: JSON.parse(JSON.stringify(id))
        }
    }
}

export default function Page({ items, categories, category, id }) {
    const [addNew, setAddNew] = useState(false)
    const [listItems, setListItems] = useState(items)

    console.log(category)

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
                    }).then((response) => response.json()).then((data) => {
                        setListItems(JSON.parse(data.message))
                        setAddNew(false)
                    })
                })}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th><NavLink label={category.name} leftSection={
                                        category.icon == "IconCake" ? <IconCake size="1rem" stroke={1.5}/> : (
                                            category.icon == "IconCamera" ? <IconCamera size="1rem" stroke={1.5}/> : (
                                                category.icon == "IconVideo" ? <IconVideo size="1rem" stroke={1.5}/> : (
                                                    category.icon == "IconHeart" ? <IconHeart size="1rem" stroke={1.5}/> : <></>
                                                )
                                            )
                                        )
                                    } variant="filled" active></NavLink></Table.Th>
                                <Table.Th>Description</Table.Th>
                                <Table.Th>Status</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {listItems.map((item) => (
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
                                                    body: JSON.stringify({id: item.id, categoryId: item.categoryId})
                                                }).then((response) => response.json()).then((data) => {
                                                    setListItems(JSON.parse(data.message))
                                                })
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