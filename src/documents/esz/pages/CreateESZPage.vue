<template>

	<h1 style="color:red; ">В РАЗРАБОТКЕ</h1>
	<br/>
	
	<Form mode="create" />
</template>

<script setup>
import { useBackButton } from '@/plugins/menu';
import { Form } from '@/documents/esz/widgets/form';

useBackButton({ fallbackPath: '/sed' });
</script>