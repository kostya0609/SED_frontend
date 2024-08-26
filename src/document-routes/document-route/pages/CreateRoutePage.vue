<template>
    <h3>Cоздание маршрута</h3>
    <Form mode="create" />
</template>

<script setup>
import { useBackButton } from '@/plugins/menu';
import { Form } from '@document-routes/document-route/widgets/form'

useBackButton({ fallbackPath: '/sed' });

</script>