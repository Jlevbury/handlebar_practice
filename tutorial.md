## Handlebars.JS 
An overview of the use of Handlebars.JS when used in an express.JS application with sequelize.

# File Structure Mock Up
EXAMPLE APP FOLDER STRUCTURE

```
/my-app
  /node_modules
  /public
    /stylesheets
    /images
    /javascripts
  /views
    /partials
      _navbar.handlebars
    /layouts
      main.handlebars
    home.handlebars
    about.handlebars
    display-name.handlebars
  .env
  package.json
  app.js
```
**Directory contents**
- `node_modules`: Contains all the Node.js modules installed for your project.
- `public`: Used to serve static files like CSS, JavaScript, and images.
- `views`: This is where you keep your Handlebars templates. Each file in this directory corresponds to a different page on your website.
- `views/partials`: Contains partial templates, which are reusable pieces of HTML.
- `views/layouts`: Contains layout templates, which define the common structure of your pages.
- `.env`: (Optional) Contains environment variables for your app.
- `package.json`: Contains metadata about your app and lists its dependencies.
- `app.js`: The main entry point to your app. This is where you set up your Express server and define your routes.

**Step-by-Step startup**

1. **Set Up the Project**: We created a new Node.js project and installed the necessary dependencies.

2. **Set Up Express and Handlebars**: In `app.js`, we created an Express app and set up Handlebars as our view engine.

3. **Defined Routes**: We added routes to our Express app using `app.get()` and `app.post()`. These routes render views and handle form submissions.

4. **Created Views**: We created Handlebars views for each of our routes. These views include a home page, an about page, and a page to display a submitted name.

5. **Created and Used Partials**: We created a partial for our navbar and used it in our views. This allows us to reuse the same navbar across multiple pages.

6. **Created a Layout**: We created a layout that includes the common structure of our pages. This layout is used as the default for all of our views.

7. **Handled Form Submissions**: We created a form on our home page, and a route to handle the form's POST request. The route extracts the submitted name and passes it to a view, which displays the name.

8. **Ran the App**: Finally, we ran our app using `node app.js` and tested it in the browser and with Insomnia.

# Handlebars syntax and structure

 a brief overview of Handlebars syntax, including block helpers, conditional statements, and logic.

1. **Basic Syntax**

    The basic syntax of Handlebars involves wrapping variables in double curly braces like `{{variable}}`. Handlebars will replace these placeholders with the actual values when the template is rendered. 

    Example:
    ```handlebars
    <h1>Welcome, {{name}}!</h1>
    ```

2. **Block Helpers**

    Block helpers are used for complex logic in Handlebars templates. They are defined in JavaScript and used in the template inside `{{#helper}}...{{/helper}}`.

    - `{{#each}}...{{/each}}`: This block helper iterates over an array or object. Inside the `each` block, you can use `this` to reference the current item.

        Example:
        ```handlebars
        <ul>
        {{#each names}}
            <li>{{this}}</li>
        {{/each}}
        </ul>
        ```

    - `{{#if}}...{{/if}}`: This block helper is used for conditional rendering. It checks if a condition is truthy. If it is, it renders the block of code inside the `if`. You can also add an `{{else}}` block which is rendered when the condition is falsey.

        Example:
        ```handlebars
        {{#if user}}
            <h1>Welcome back, {{user}}!</h1>
        {{else}}
            <h1>Welcome, guest!</h1>
        {{/if}}
        ```
        Sure, let's go over block helpers in Handlebars.

A block helper in Handlebars is a function that is used to perform complex logic directly in the view. It's called a block helper because it operates on a "block" of code, which is the content between the opening `{{#helper}}` and closing `{{/helper}}` tags.

Block helpers can be used for a variety of tasks, such as conditional rendering, looping over arrays or objects, and creating custom helpers.

Here's an overview of how a few of the built-in block helpers work:

- **{{#each}}...{{/each}}:** This is a block helper for iterating over arrays or objects. For example:

  ```handlebars
  {{#each array}}
    <p>{{this}}</p>
  {{/each}}
  ```

  In this code, `{{#each array}}` begins the block, and `{{/each}}` ends it. For every element in `array`, Handlebars will render a new `<p>` tag with the content of the element (`{{this}}`).

- **{{#if}}...{{/if}}:** This is a block helper for conditional rendering. For example:

  ```handlebars
  {{#if condition}}
    <p>The condition is true!</p>
  {{else}}
    <p>The condition is false!</p>
  {{/if}}
  ```

  In this code, if `condition` is truthy, Handlebars will render the first `<p>` tag. If `condition` is falsey, it will render the second `<p>` tag.

You can also define your own custom block helpers using `Handlebars.registerHelper()`. 

let's break this down in a step-by-step manner:

1. **Import Handlebars**

   The first thing you'll need to do is import Handlebars into your file:

   ```javascript
   var Handlebars = require('handlebars');
   ```

   We use the `require` function to import the `handlebars` package and assign it to a variable.

2. **Create a Helper Function**

   Next, you'll create a JavaScript function that performs the desired operations. This function will eventually be registered as a Handlebars helper.

   As an example, we'll create a helper function that outputs a list of items:

   ```javascript
   function list(items, options) {
     var out = "<ul>";
   
     for(var i=0, l=items.length; i<l; i++) {
       out = out + "<li>" + options.fn(items[i]) + "</li>";
     }
   
     return out + "</ul>";
   }
   ```

   In this function:
   - `items` is an array of items that you want to include in the list.
   - `options` is an object that Handlebars passes to your helper. One key property of this object is `options.fn`, which you can call to process the block associated with the helper. In this case, we call `options.fn(items[i])` to render each individual item.
   - The function generates an HTML string representing an unordered list (`<ul>`) of the items, and returns this string.

3. **Register the Helper**

   After defining the helper function, you'll register it with Handlebars:

   ```javascript
   Handlebars.registerHelper('list', list);
   ```

   `registerHelper` is a method provided by Handlebars that allows you to add a new helper. The first argument is a string representing the helper's name (which will be used in your templates), and the second argument is the helper function itself.

4. **Use the Helper in a Template**

   Once your helper is registered, you can use it in a Handlebars template:

   ```handlebars
   {{#list items}}{{this}}{{/list}}
   ```

   This template uses the `list` helper to render an array `items`. The block `{{this}}` is what will be passed to `options.fn` in your helper function: for each item in `items`, Handlebars will replace `{{this}}` with the item itself.

   When this template is rendered with an array of items (say, `['apple', 'banana', 'cherry']`), it will output a list of these items:

   ```html
   <ul>
     <li>apple</li>
     <li>banana</li>
     <li>cherry</li>
   </ul>
   ```

And that's it! You've now created and used a custom block helper in Handlebars. This process can be customized and extended to create all sorts of complex behavior. But the basic steps—defining a helper function, registering it, and using it in a template—remain the same.


3. **Escape and Unescaped Expressions**

    By default, Handlebars escapes values when using the `{{variable}}` syntax. This means it will convert characters like `<`, `>`, `&` into safe text. If you don't want Handlebars to escape a value, you can use triple braces like `{{{variable}}}`.

    Example:
    ```handlebars
    <div>{{{htmlContent}}}</div>
    ```

4. **Comments**

    You can add comments to your Handlebars templates using the `{{!-- --}}` syntax. Handlebars will ignore anything inside these tags.

    Example:
    ```handlebars
    {{!-- This is a Handlebars comment. --}}
    ```

5. **Partials**

    Partials allow you to reuse pieces of HTML across multiple templates. They are defined using the `{{>partialName}}` syntax.

    Example:
    ```handlebars
    {{> navbar}}
    ```

Remember, Handlebars is logic-less, meaning it's designed to keep logic out of your templates as much as possible. It's best used for simple logic like loops and conditionals. For more complex logic, it's usually best to prepare the data in JavaScript before passing it to the template.



# Block Helpers

1. **Displaying Lists**

   Handlebars allows you to iterate over arrays using the `{{#each}}` block helper. Here's an example of how to display a list:

   ```html
   <ul>
     {{#each items}}
       <li>{{this}}</li>
     {{/each}}
   </ul>
   ```
   In this case, `items` is an array that you would pass from your Express route, and `{{this}}` refers to the current item in the array.

   You can also access the array index:

   ```html
   <ul>
     {{#each items}}
       <li>{{@index}}: {{this}}</li>
     {{/each}}
   </ul>
   ```
   `{{@index}}` refers to the current index in the array.

2. **Conditional Statements**

   Handlebars allows you to include conditional statements in your views using the `{{#if}}` block helper. Here's an example:

   ```html
   {{#if user}}
     <h1>Welcome, {{user.name}}!</h1>
   {{else}}
     <h1>Welcome, guest!</h1>
   {{/if}}
   ```
   In this case, `user` is an object that you would pass from your Express route. If `user` exists, Handlebars will display the first `<h1>`. If `user` doesn't exist or is falsey, Handlebars will display the second `<h1>`.

3. **Partials**

   Partials in Handlebars are like includes, or sub-templates, that you can use to modularize your HTML. For instance, if you have a navbar that's included in multiple pages, you can create a partial for it.

   First, create a new file in `views/partials/` called `_navbar.handlebars` (the underscore is a common convention to indicate that this file is a partial).

   Then, you can include this partial in your views using the `{{>}}` tag:

   ```html
   {{> _navbar}}
   <h1>Home Page</h1>
   ```
   In this example, Handlebars will inject the contents of `_navbar.handlebars` where `{{> _navbar}}` is.

Before you start using partials, you'll need to register them with Express Handlebars. Add the following code to your `app.js` after setting the view engine:

```javascript
const hbs = expressHandlebars.create({ defaultLayout: 'main' });

// After this line
app.set('view engine', 'handlebars');

// Add these lines
const partialsDir = __dirname + '/views/partials/';

hbs.getPartials().then(function (partials) {
    for (let partial in partials) {
        hbs.registerPartial(partial, partials[partial]);
    }
});
```

In this code, we're registering each file in the `views/partials/` directory as a partial.

# Integration with Sequelize

The next steps will involve understanding how to interact with a database using Sequelize. This allows your application to store, retrieve, update, and delete data in a structured and organized way.

1. **Setup Sequelize**: Sequelize is a promise-based Node.js ORM (Object-Relational Mapping) for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It provides an easy way to connect and interact with databases.

```javascript
const Sequelize = require('sequelize');

// setup connection
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
```

2. **Define Models**: Models in Sequelize represent a table in the database. They are defined with `sequelize.define('name', {attributes}, {options})`.

```javascript
const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
});
```

3. **Interact with your Database**: Sequelize provides a rich set of methods for CRUD (Create, Read, Update, Delete) operations.

```javascript
// Create a new user
User.create({ firstName: "John", lastName: "Doe" })
  .then(user => console.log(user.toJSON()));

// Fetch all users
User.findAll()
  .then(users => console.log(users));

// Update a user
User.update({ lastName: "Smith" }, {
  where: {
    firstName: "John"
  }
}).then(() => console.log("John Doe updated successfully"));

// Delete a user
User.destroy({
  where: {
    firstName: "John"
  }
}).then(() => console.log("John Doe deleted successfully"));
```

This is a brief overview of how Sequelize works. As you start integrating it with your application, you'll get a better understanding of how everything fits together.

Using a `routes` and `models` folder is indeed a best practice when structuring a Node.js application, especially when using Express and Sequelize. This type of organization is commonly referred to as a MVC (Model-View-Controller) structure, which cleanly separates concerns and helps to keep your code organized and maintainable.
# MVC introduction
**Mock up directory structure**
Here's a simplified view of how your folder structure might look like:

```
/my-app
  /node_modules
  /public
  /views
    /layouts
    /partials
  /routes
    index.js
    users.js
  /models
    index.js
    user.js
  app.js
  package.json
```

1. **Models**

   Each file in the `models` folder represents a table in your database. For example, the `user.js` file would contain the definition of the `User` model:

   ```javascript
   // models/user.js
   const { Model, DataTypes } = require('sequelize');
   
   module.exports = (sequelize) => {
     class User extends Model {}

     User.init({
       // Define your model attributes here
       firstName: DataTypes.STRING,
       lastName: DataTypes.STRING,
     }, {
       sequelize,
       modelName: 'User',
     });

     return User;
   };
   ```

   The `models/index.js` file initializes Sequelize with your database configuration, imports all the models, and sets up any associations between them:

   ```javascript
   // models/index.js
   const Sequelize = require('sequelize');
   const UserModel = require('./user');

   const sequelize = new Sequelize('database', 'username', 'password', {
     host: 'localhost',
     dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
   });

   const User = UserModel(sequelize);

   // If you have other models, you would initialize and import them here

   // Then setup any associations between models

   module.exports = {
     sequelize, // You can use this in app.js to connect to the database
     User,
     // Export other models here
   };
   ```

2. **Routes**

   Each file in the `routes` folder handles a set of related routes. For example, the `users.js` file might handle all routes related to users:

   ```javascript
   // routes/users.js
   const express = require('express');
   const { User } = require('../models');
   const router = express.Router();

   router.get('/', async (req, res) => {
     const users = await User.findAll();
     res.render('users', { users });
   });

   // Add other user-related routes here

   module.exports = router;
   ```

   The `routes/index.js` file is typically used to combine all your route handlers and export them as a single middleware function:

   ```javascript
   // routes/index.js
   const express = require('express');
   const users = require('./users');
   const router = express.Router();

   router.use('/users', users);

   // Add other route handlers here

   module.exports = router;
   ```

3. **Integrating Models and Routes in `app.js`**

   Finally, in your `app.js` file, you can import the models and routes and use them in your application:

   ```javascript
   // app.js
   const express = require('express');
   const { sequelize } = require('./models');
   const routes = require('./routes');
   const app = express();

   // Your existing code for setting up Handlebars here

   app.use(routes);

   sequelize.sync() // This will create the necessary tables in your database
     .then(() => {
       app.listen(3000, () => console.log('App listening on port 3000'));
     })
     .catch(err => console.error('Unable to connect to the database:', err));
   ```

This structure allows you to keep related code grouped together, making your application easier to understand and maintain. Each part of your application has a specific place and purpose.

Remember to install Sequelize and the appropriate Sequelize dialect for your database (e.g., `mysql2` for MySQL) using npm:

```bash
npm install sequelize mysql2
```

Please replace `'database'`, `'username'`, and `'password'` with your actual database name, username, and password, and select the right dialect according to your database.




