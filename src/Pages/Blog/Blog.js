import React from 'react';
import useTitle from '../../Hooks/useTitle';

const Blog = () => {
  useTitle('Blog')
  return (
    <div>
      <div className='w-11/12 md:w-10/12 mx-auto'>
        <div className='p-10 my-10 rounded-xl'>
          <h2 className='text-2xl font-bold mb-5'>1. What are the different ways to manage a state in a React application?</h2>
          <p className='mb-3'>There are four main types of state you need to properly manage in your React apps:
            1. Local state
            2. Global state
            3. Server state
            4. URL state</p>
          <p className='mb-3'>Local (UI) state – Local state is data we manage in one or another component.

            Local state is most often managed in React using the useState hook.

            For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.
          </p>
          <p className='mb-3'>
            Global (UI) state – Global state is data we manage across multiple components.

            Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.

            A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.

            Sometimes state we think should be local might become global.
            </p>
          <p className='mb-3'>
            Server state – Data that comes from an external server that must be integrated with our UI state.

            Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.

            There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.

            Fortunately there are tools such as SWR and React Query that make managing server state much easier.
            </p>
          <p className='mb-3'>
            URL state – Data that exists on our URLs, including the pathname and query parameters.

            URL state is often missing as a category of state, but it is an important one.
            In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!</p>
        </div>

        <div className='p-10 my-10 rounded-xl'>
          <h2 className='text-2xl font-bold mb-5'>2. How does prototypical inheritance work?</h2>
          <p className='mb-3'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>
        </div>

        <div className='p-10 my-10 rounded-xl'>
          <h2 className='text-2xl font-bold mb-5'>3. What is a unit test? Why should we write unit tests?</h2>
          <p className='mb-3'>In computer programming, unit testing is a software testing method by which individual units of source code—sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures—are tested to determine whether they are fit for use.</p>
          <p className='mb-3'>They enable you to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase. For example, if you're having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.</p>
        </div>

        <div className='p-10 my-10 rounded-xl'>
          <h2 className='text-2xl font-bold mb-5'>4. React vs. Angular vs. Vue?</h2>
          <p className='mb-3'>Angular, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. A substantial shift occurred in 2016 on the release of Angular 2 (and the dropping of the “JS” from the original name – AngularJS). Angular 2+ is known as just Angular. Although AngularJS (version 1) still gets updates, we will focus the discussion on Angular.</p>

          <p className='mb-3'>Vue, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014. Over the last several years, Vue has seen a substantial shift in popularity, even though it doesn’t have the backing of a large company. The most current version is always announced on the official Vue website on their releases page. Contributors for Vue are supported by Patreon. It should be noted that Vue also has its own GitHub repo, and functions using TypeScript.</p>

          <p className='mb-3'>React, developed by Facebook, was initially released in 2013. Facebook uses React extensively in their products (Facebook, Instagram, and WhatsApp). Similar to Vue, the React developers also announce their newest version on the blog section of the React website.</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;