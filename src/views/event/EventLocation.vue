<template>
	<div>
		<p>{{ event ? event.location.name : "" }}</p>
	</div>
</template>

<script>
export default {
	props: ["event"]
};
</script>
