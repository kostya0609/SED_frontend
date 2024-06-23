<template>
	<Form mode="create" />
</template>

<script setup>
import { Form } from '@/documents/directive/widgets/form';
import { useBackButton } from '@/plugins/menu';

useBackButton({ fallbackPath: '/sed' });
</script>