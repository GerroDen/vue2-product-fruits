Vue2 port of [`react-product-fruits`](https://www.npmjs.com/package/react-product-fruits).

# Props
All props are equal to the [react component](https://docs.productfruits.com/developers/integration-react-nextjs) or [vanilla integration](https://docs.productfruits.com/developers/integration-web-applications) of Product Fruits.

## Required
**project-code** `string`<br/>
ID of your workspace

**language** `string`<br/>
2-letter ISO language code, it has to match values you specified before in Product Fruits administration (see Workspace settings -> Supported Languages)

**username** `string`<br/>
a unique identifier of the currently logged-in user

## User properties
**email** `string`<br/>

**firstname** `string`<br/>

**lastname** `string`<br/>

**sign-up-at** `string`<br/>
can be any format but we recommend the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) JSON DateTime format

**role** `string`<br/>
can be any format

**props** `Record<string, string | number | boolean>`<br/>
custom user properties

# Example
Register the component locally or globally and use it in templates.
```
<product-fruits
    project-code="ABCDEFGHIJK"
    language="de"
    username="alice"
    email="alice@example.net"
    firstname="alice"
    lastname="supergirl"
    sign-up-at="2021-06-24T17:36:34.000Z"
    role="user"
    :props="{propA: 'A', propB: 'B'}"
/>
```