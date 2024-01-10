
import prisma from "../lib/prisma";
import { Stack, Table, Checkbox, ActionIcon, Input, Title, Button, Group, NavLink, Space } from "@mantine/core";
import { IconTrash, IconX, IconPlus, IconCheck, IconPencil, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { IconVideo, IconCamera, IconCake, IconHeart } from "@tabler/icons-react";

export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  const allData = await prisma.category.findMany({
    select: {
      name: true,
      description: true,
      id: true,
      items: true,
      icon: true
    }
  })

  return {
    props: { 
      categories: JSON.parse(JSON.stringify(categories)),
      allData: JSON.parse(JSON.stringify(allData))
    },
  };
}

import Navbar from "@/components/Navbar";

export default function HomePage({ categories, allData }) { 
  return (
    <>
      <Navbar categories={categories}>
      <Table>
          {allData.map((category) => (
            <>
              <Table.Thead>
                <Table.Tr>
                    <Table.Th><NavLink label={category.name} href={`/category/${category.id}`} leftSection={
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
                {category.items.map((item) => (
                    <Table.Tr key={item.id}>
                        <Table.Td>{item.name}</Table.Td>
                        <Table.Td>{item.description}</Table.Td>
                        <Table.Td><Checkbox checked={false}/></Table.Td>
                    </Table.Tr>
                ))}
              </Table.Tbody>
            </>
          ))}
        </Table>
      </Navbar>
    </>
  );
}