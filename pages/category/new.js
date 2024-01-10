import prisma from "@/lib/prisma"

import Navbar from "@/components/Navbar";
import { ActionIcon, Button, Checkbox, Input, Stack, Table, Group } from "@mantine/core";
import { IconPlus, IconTrash, IconX, IconCheck, IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
    const categories = await prisma.category.findMany();

    return { 
        props: { 
            categories: JSON.parse(JSON.stringify(categories)),
        }
    }
}

export default function Page({ categories }) {
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
        }
    })

    const router = useRouter()
    
    return (
        <Navbar categories={categories}>
            <Stack>
                <form onSubmit={form.onSubmit((values) => {
                    fetch("/api/newCategory", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(values)
                    }).then((response) => response.json()).then((data) => {
                        console.log(JSON.parse(data.message))
                        router.push(`/category/${JSON.parse(data.message).id}`)
                    })
                })}>
                    <Table>
                        <Table.Thead>  
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Description</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                    <Table.Td><Input {...form.getInputProps("name")}/></Table.Td>
                                    <Table.Td><Input {...form.getInputProps("description")}/></Table.Td>
                                    <Table.Td>
                                        <Group>
                                            <ActionIcon type="submit"><IconCheck size="1rem" stroke={1.5}/></ActionIcon>
                                        </Group>
                                    </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </form>
            </Stack>
        </Navbar>
    )
}