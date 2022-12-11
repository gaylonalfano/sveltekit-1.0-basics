<script lang="ts">
	import { enhance, applyAction, type SubmitFunction } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	export let form: ActionData;

  // TODO Implement the submitDeleteNote() logic!

	// Add some client-side form validation by using use:enhance
	// with a custom SubmitFunction (runs BEFORE form submitted to server)
	// and a callback (runs AFTER form submitted) with ActionResult + update
	// NOTE With use:enhance, you basically can replicate your server side
	// form actions for additional validation. At the very least, you want
	// server-side validation, but this is a nice extra layer.
	const submitCreateNote: SubmitFunction = ({ form, data, action, cancel }) => {
		// `form` is the `<form>` element
		// `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission
		// console.log('form: ', form);
		// console.log('data: ', data);
		// console.log('action: ', action);
		// console.log('cancel: ', cancel);

		const { title, content } = Object.fromEntries(data);

		// if ((title as string).length < 1) {
		// 	// NOTE Progressive Enhancement allows us to add toast notifications
		// 	// which couldn't be done with regular server-side actions (I think)...
		// 	toast.error('Title cannot be blank!');
		// 	cancel(); // This prevents submission! i.e., PreventDefault!
		// }

		// REF: https://youtu.be/jXtzWMhdI2U?list=PLq30BP0TIcqXP149TyFMfRhnMT6T5--e5&t=606
		return async ({ result, update }) => {
			// `result` is an `ActionResult` object
			// NOTE 'result.type' is whatever is returned from the Action inside page.server.ts!
			// If we return invalid(), error(), etc., then that's the result.type
			// `update` is a function which triggers the logic that would be triggered if this callback wasn't set

      // === update() vs. applyAction(result) ===
      // IMPORTANT: update() ~= form.reset() + applyAction(result) + invalidateAll()
      // TL;DR: If action is on same page use update() instead!
      // NOTE invalidateAll() will re-trigger the load() function to get updated data!
			// NOTE If you don't want the form fields to reset (eg. you're editing a note),
			// then you simply pass an options object with reset: false
			// await update({ reset: false });
			// NOTE You can call this inside the switch as well!
			// NOTE applyAction lets us essentially replicate the update(),
			// when we have MULTIPLE forms and pages hitting the SAME action!
			// If we want to enhance those, we want to applyAction(result) instead
			// of simply await update(), since update() only works for a form action
			// on the same page!
      // NOTE update() ~= form.reset() + applyAction(result) + invalidateAll()
      // await applyAction(result);
			switch (result.type) {
				case 'success':
					toast.success('Note created!');
          // form.reset();
          // await applyAction(result);
          // await invalidateAll(); // triggers load()!
					// await update({ reset: false });
					break;
				case 'invalid':
					toast.error('ActionResult::Title cannot be blank!');
					break;
				default:
					break;
			}

      await update();

		};


    const submitDeleteNote: SubmitFunction = ({ form, data, action, cancel }) => {
      // TODO
    } 
	};
</script>

<div class="split">
	<div class="side">
		<form action="?/create" method="POST" class="form-create" use:enhance={submitCreateNote}>
			<label for="title"> Title </label>
			<input type="text" name="title" />
			<label for="content">Content</label>
			<input type="text" name="content" />
			<button type="submit">Add</button>
			{#if form?.errorMsg}
				<div class="alert error">{form.errorMsg}</div>
			{/if}
		</form>
	</div>
	<div class="side">
		{#each data.notes as note}
			<div class="note">
				<div>
					<h4>{note.title}</h4>
					<p>{note.content}</p>
				</div>
				<form action="?/delete" method="POST" use:enhance>
					<input type="hidden" name="title" value={note.title} />
					<button type="submit">❌</button>
				</form>
			</div>
		{/each}
	</div>
</div>

<style>
</style>
