<script lang="ts" setup>
const router = useRouter()

const items = ref([
    ...router.options.routes.map((route) => ({
        label: route.name,
        route: route.path,
        icon: 'pi pi-angle-right',
    })),
])
</script>

<template>
    <div class="flex min-h-screen flex-col bg-white dark:bg-slate-900">
        <WTopBar />
        <div
            class="card bg-surface-50 dark:bg-surface-700 sticky left-0 right-0 top-0 z-10 shadow-lg bg-white dark:bg-black">
            <Menubar class="container mx-auto border-none">
                <template #start>
                    <div class="flex items-center gap-4 bg-white dark:bg-black">
                        <WNavigationDrawer>
                            <template #prepend>
                                <span
                                    class="text-primary dark:text-primary text-2xl font-black uppercase md:text-6xl xl:text-6xl"
                                    ><span class="bg-primary text-white"
                                        >mư</span
                                    >ợt UI</span
                                >
                            </template>

                            <ul>
                                <li
                                    v-for="(item, index) in items"
                                    :key="index"
                                    :class="[
                                        'hover:text-primary pb-4 uppercase hover:font-bold hover:underline',
                                        {
                                            'text-primary font-black underline':
                                                $route.path === item.route,
                                        },
                                    ]">
                                    <NuxtLink :to="item.route">
                                        {{ item.label }}
                                    </NuxtLink>
                                </li>
                            </ul>

                            <template #append>
                                <p class="text-center">[Default layout]</p>
                            </template>
                        </WNavigationDrawer>

                        <span class="text-primary font-bold uppercase">{{
                            $route.name
                        }}</span>
                    </div>
                </template>
                <template #end>
                    <div class="flex items-center gap-4">
                        <SwitchDarkMode outlined />
                        <Button text icon="pi pi-palette" />
                        <Avatar
                            icon="pi pi-user"
                            class="mr-2"
                            size="large"
                            shape="circle" />
                    </div>
                </template>
            </Menubar>
        </div>

        <div><slot /></div>
        <WFooter
            class="mt-auto"
            :blocks="['copyright']"
            brand-name="Wellcare"
            year="2015" />
    </div>
</template>
