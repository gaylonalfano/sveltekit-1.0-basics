<script>
  // NOTE The idea around using form POST submissions is that you can disable JS
  // and you still have a working app! Yes, it will do a full page reload after
  // submission, but you can use Svelte's enhance to use JS to improve UX.
	// REF: https://youtu.be/52nXUwQWeKI?list=PLq30BP0TIcqXP149TyFMfRhnMT6T5--e5&t=1105
	import { enhance, applyAction } from '$app/forms';
	import ContactsTable from '$lib/components/ContactsTable.svelte';
	import Alert from '../../lib/components/Alert.svelte';


	export let data;
	// IMPORTANT This 'form' object is the returned object from +page.server.js!
	// This means we have access to whatever data is returned (invalid data or success).
	// So, if there's an invalid() error, we can access 'form' to see all the details
	// and returned form fields data. This way, we can repopulate the form fields that
	// have VALID data, so user doesn't have to start all over when an error occurs!
	export let form; // The returned object from +page.server.js
	console.log(form) // { success: true } on BOTH server and client logs! Also invalid()!
</script>

<div class="w-full">
	<div class="flex justify-between items-center w-full">
		<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">Contact Manager</h2>
	</div>
	<form
		method="POST"
		action="?/create"
		class="w-full flex flex-col"
		use:enhance={({ form, data, action, cancel }) => {
      // NOTE This whole function is a SubmitFunction that runs
      // immediately BEFORE the form is submitted to server. You can optionally
      // return a callback that runs with the ActionResult.
			// `form` is the `<form>` element
			// `data` is its `FormData` object
			// `action` is the URL to which the form is posted
			// `cancel()` will prevent the submission
			console.log('form', form);
			console.log('data', data);
			console.log('action', action);
			console.log('cancel', cancel);

			return async ({ result, update }) => {
        // NOTE Runs AFTER form submission to server.
				// `result` is an `ActionResult` object
				// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
        console.log('result', result);
        // Let's reset the form if successful
        if (result.type === 'success') {
          form.reset();
        }


        if (result.type === 'invalid') {
          await applyAction(result);
        }
        // IMPORTANT The load() function only runs ONCE, so it's not
        // running again when we submit the form. Therefore, even after
        // a success submit, we have to refresh the page to see the new
        // contact added/displayed. To fix this, we utilize the 'update()
        // function that will reset <form> el and invalidate all data
        // using invalidateAll. This will trigger the load() again after
        // each successful form submission to get the latest data!
        update();
			};
		}}
	>
		<div class="form-control w-full max-w-xs">
			<label for="name" class="label">
				<span class="label-text">Name</span>
			</label>

			<input
				type="text"
				name="name"
				value={form?.name ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				value={form?.email ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="company" class="label">
				<span class="label-text">Company</span>
			</label>

			<input
				type="text"
				name="company"
				value={form?.company ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label for="job" class="label">
				<span class="label-text">Job</span>
			</label>

			<input
				type="text"
				name="job"
				value={form?.job ?? ''}
				class="input input-primary input-bordered w-full max-w-xs"
			/>
		</div>
		<button class="mt-4 btn btn-primary w-full max-w-xs">Add</button>
    {#if form?.error}
      <Alert message={form.message} />
    {/if}
	</form>

	<ContactsTable contacts={data?.contacts} />
</div>
