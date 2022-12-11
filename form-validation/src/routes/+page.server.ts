import { z } from 'zod';
import type { RequestEvent } from '@sveltejs/kit';


// NOTE If it's not defined/validated inside your Schema,
// then Zod will strip out the missing fields from the result object
const registerSchema = z.object({
  name: z.string().min(1).max(64).trim(),
  email: z.string().min(1).max(64).email(),
  password: z.string().min(6).max(32).trim(),
  passwordConfirm: z.string().min(6).max(32).trim(),
  terms: z.enum(['on']),
})

export const actions = {
  default: async ({ request }: RequestEvent) => {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData);

    // NOTE Gotta use try/catch with Zod validation
    try {

      const result = registerSchema.parse(formData);
      console.log('SUCCESS');
      console.log(result);

    } catch (error) {
      console.log(error);
    }

    // Next, we can use this validated object to add to DB,
    // throw redirect, etc.

    return {
      success: true
    }


  }
}


// IMPORTANT: Notes from form-actions example:
// // REF: https://kit.svelte.dev/docs/form-actions#anatomy-of-an-action
// // NOTE Form Actions are added inside the +page.server.js of whichever
// // page route you want to add these actions to.
// import { invalid, redirect } from "@sveltejs/kit"


// // NOTE Typically we use the load() to fetch data from db
// // and return the data object for +page.svelte
// let contacts = [
//   {
//     id: 'de393e6a-1c08-4e6e-9aad-0994fcf0d981',
//     name: 'Saul Goodman',
//     email: 'saul@example.com',
//     company: 'Saul Goodman & Associates',
//     job: 'Attorney'
//   }
// ]

// export const load = () => {
//   // NOTE Normally will do some async fetches here and return
//   // data object
//   return {
//     contacts
//   }
// }

// // NOTE Actions are stored in the 'actions' object, and there
// // is a default action handler, which is method attribute we
// // add directly to the <form> element! E.g, <form method="POST">
// export const actions = {
//   // NOTE Each action receives a RequestEvent object, allowing us to
//   // read the form data using request.formData().
//   // U: Use Named Actions instead of default action. This is helpful
//   // when you have multiple forms on same page route.
//   // You invoke a named action by adding a query param w/ the name
//   // prefixed by '/' character: ?/login, ?/register, ?/delete
//   // You need to specify the action inside the <form> element
//   // by adding the action="?/actionName" attribute.
//   // ?/create
//   create: async ({ request }) => {
//     const formData = await request.formData();
//     // NOTE This is logged in the SERVER! Not the browser!
//     console.log(formData); // FormData Object | null

//     // NOTE Typically you would create a helper to accepts the
//     // entire FormData object, so you can extract and return
//     // the finished data you want returned.
//     const name = formData.get('name'); // <input name="name">
//     const email = formData.get('email'); // <input name="email">
//     const company = formData.get('company'); // <input name="company">
//     const job = formData.get('job'); // <input name="job">

//     // Add some basic validation (*look into Zod tutorial)
//     if (name.length < 2) {
//       return invalid(400, {
//         error: true,
//         message: 'Name must be at least 2 characters long',
//         // Return the data in the fields so doesn't erase whole form
//         // NOTE Don't return the field if you don't want (eg password)
//         name,
//         email,
//         company,
//         job
//       });
//     }


//       
//     // Now that we have this VALIDATED data, we can do a few things:
//     // Use built-in to generate a random contact ID
//     const id = crypto.randomUUID();

//     // Construct a new db object, add to db, do validation, etc.
//     const contact = {
//       id,
//       name,
//       email,
//       company,
//       job
//     };

//     contacts.push(contact);

//     // NOTE Many apps have a form on a separate page and then will
//     // redirect back to the contacts page. This is handled by redirect.
//     // NOTE redirect() calls Svelte's goto(result.location) (I think...)
//     // For example, say we want to redirect the user to the home page.
//     throw redirect(303, '/');

//     // NOTE Our frontend has no clue if this was successful, so
//     // it's good to return something.
//     // IMPORTANT This returned object is 'form' inside our +page.svelte!
//     // This means we can use this (just like 'data') by export let form.
//     // This also means we can pass some info about our form BACK to our
//     // client side, which is useful for validation and being able to return
//     // data BACK to the form itself!
//     return {
//       success: true
//     }

//   },

//   // ?/delete
//   delete: async ({ request }) => {
//     const formData = await request.formData();
//     const id = formData.get('id');
//     console.log("DELETE id: ", id);

//     // Time to update (delete) the contact from array
//     // Our page component will pass updated contacts data
//     // to the ContactsTable component
//     contacts = contacts.filter((c) => c.id !== id);
//     
//     return {
//       success: true,
//     }

//   }

// }

