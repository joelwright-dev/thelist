import Head from 'next/head';
import { MantineProvider, AppShell, Burger, Group, Skeleton, Title, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { theme } from '../theme';
import { IconCake, IconCamera, IconHome, IconVideo } from '@tabler/icons-react';

export default function Navbar({children, categories}) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <MantineProvider theme={theme}>
            <Head>
                <title>Mantine Template</title>
                <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                padding="md"
            >
                <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Title>The List</Title>
                </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <NavLink href={`/`} label="Home" leftSection={<IconHome size="1rem" stroke={1.5}/>}/>
                    {categories.map((category) => (
                        <NavLink href={`/category/${category.id}`} label={category.name} leftSection={
                            category.icon == "IconCake" ? <IconCake size="1rem" stroke={1.5}/> : (
                                category.icon == "IconCamera" ? <IconCamera size="1rem" stroke={1.5}/> : (
                                    category.icon == "IconVideo" ? <IconVideo size="1rem" stroke={1.5}/> : <></>
                                )
                            )
                        }/>
                    ))}
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}