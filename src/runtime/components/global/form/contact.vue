<script setup lang="ts">
import type { PropType } from '#imports'
type BlockType =
    | 'title'
    | 'subtitle'
    | 'email'
    | 'phone'
    | 'subject'
    | 'message'

interface Input {
    label: string
    placeholder: string
    required?: boolean
    pattern?: string
}

const { blocks, title, subject, subtitle, email, cta, phone, message } =
    defineProps({
        blocks: {
            type: Array as PropType<BlockType[]>,
            default: () => [
                'title',
                'subtitle',
                'email',
                'phone',
                'subject',
                'message',
            ],
        },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        cta: { type: String, default: 'Send Message' },
        email: {
            type: Object as PropType<Input>,
            default: () => ({
                label: 'Your Email',
                placeholder: 'name@your-company-email.com',
                required: true,
            }),
        },
        phone: {
            type: Object as PropType<Input>,
            default: () => ({
                label: 'Your Phone',
                placeholder: '09123456789',
                required: false,
            }),
        },
        subject: {
            type: Object as PropType<Input>,
            default: () => ({
                label: 'Subject',
                placeholder: 'Let us know how we can help you',
                required: true,
            }),
        },
        message: {
            type: Object as PropType<Input>,
            default: () => ({
                label: 'Your Message',
                placeholder: 'Leave a comment...',
                required: false,
            }),
        },
    })
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
            <slot v-if="blocks.includes('title')" name="title">
                <h2
                    class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {{ title }}
                </h2>
            </slot>
            <slot v-if="blocks.includes('subtitle')" name="title">
                <p
                    class="mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16 dark:text-gray-400">
                    {{ subtitle }}
                </p>
            </slot>

            <form action="#" class="space-y-8">
                <slot v-if="blocks.includes('email')" name="email">
                    <div>
                        <label
                            for="email"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            >{{ email.label }}</label
                        >
                        <InputText
                            id="email"
                            type="email"
                            class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            :placeholder="email.placeholder"
                            required />
                    </div>
                </slot>
                <slot v-if="blocks.includes('phone')" name="phone">
                    <div>
                        <label
                            for="phone"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            >{{ phone?.label }}</label
                        >
                        <InputText
                            id="phone"
                            type="tel"
                            class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            :placeholder="phone?.placeholder"
                            required />
                    </div>
                </slot>
                <slot v-if="blocks.includes('subject')" name="subject">
                    <div>
                        <label
                            for="subject"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            >{{ subject.label }}</label
                        >
                        <InputText
                            id="subject"
                            type="text"
                            class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            :placeholder="subject.placeholder"
                            :required="subject.required" />
                    </div>
                </slot>
                <slot v-if="blocks.includes('message')" name="message">
                    <div class="sm:col-span-2">
                        <label
                            for="message"
                            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
                            >{{ message.label }}</label
                        >
                        <Textarea
                            id="message"
                            rows="6"
                            class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            :placeholder="message.placeholder" />
                    </div>
                </slot>

                <slot name="cta">
                    <Button
                        type="submit"
                        class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-fit">
                        {{ cta }}
                    </Button>
                </slot>
            </form>
        </div>
    </section>
</template>
