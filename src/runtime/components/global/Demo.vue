<template>
    <div class="card flex justify-center">
        <PanelMenu :model="items" class="w-full md:w-80" />
    </div>
</template>

<script setup>
const items = ref([
    {
        label: 'Files',
        icon: 'pi pi-file',
        items: [
            {
                label: 'Documents',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Invoices',
                        icon: 'pi pi-file-pdf',
                        items: [
                            {
                                label: 'Pending',
                                icon: 'pi pi-stop',
                            },
                            {
                                label: 'Paid',
                                icon: 'pi pi-check-circle',
                            },
                        ],
                    },
                    {
                        label: 'Clients',
                        icon: 'pi pi-users',
                    },
                ],
            },
            {
                label: 'Images',
                icon: 'pi pi-image',
                items: [
                    {
                        label: 'Logos',
                        icon: 'pi pi-image',
                    },
                ],
            },
        ],
    },
    {
        label: 'Cloud',
        icon: 'pi pi-cloud',
        items: [
            {
                label: 'Upload',
                icon: 'pi pi-cloud-upload',
            },
            {
                label: 'Download',
                icon: 'pi pi-cloud-download',
            },
            {
                label: 'Sync',
                icon: 'pi pi-refresh',
            },
        ],
    },
    {
        label: 'Devices',
        icon: 'pi pi-desktop',
        items: [
            {
                label: 'Phone',
                icon: 'pi pi-mobile',
            },
            {
                label: 'Desktop',
                icon: 'pi pi-desktop',
            },
            {
                label: 'Tablet',
                icon: 'pi pi-tablet',
            },
        ],
    },
])
</script>
