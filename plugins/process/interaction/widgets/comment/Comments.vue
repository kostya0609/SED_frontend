<template>
	<Comment :comment="comment">
		<Comment
			v-for="answer in comment.answers"
			:key="answer.id"
			:comment="answer"
		/>
	</Comment>
</template>
<script setup>
import Comment from './Comment.vue';

defineProps({
	comment: Object,
});
</script>