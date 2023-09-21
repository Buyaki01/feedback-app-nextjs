import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // new URL(request.url): This is particularly useful when you want to extract or manipulate parts of the URL in your code, such as retrieving query parameters or checking the URL's path.
  const { searchParams } = new URL(request.url) //will create a URL object where you can access properties like: protocol: "http:", host: "localhost:3000", pathname: "/api/echo", search: "?name=John&instrument=guitar", searchParams: URLSearchParams {},
  // const name = searchParams.get('name')
  // const instrunment = searchParams.get('instrunment')
  // return NextResponse.json({ name, instrunment })
  
  // Object.fromEntries() is a JavaScript function that takes an array of key-value pairs and turns it into an object.
  // console.log(searchParams), an example of output would be: URLSearchParams { 'name' => 'John', 'instrument' => 'guitar' }
  // .entries(), you get an array of arrays, where each inner array represents a key-value pair extracted from the object. This iterator is useful when you want to loop through or manipulate the individual key-value pairs in your code. i.e [ [ 'name', 'John' ], [ 'instrument', 'guitar' ] ]
  const obj = Object.fromEntries(searchParams.entries()) //This line is converting the query parameters from the URL into an object called obj. It uses the Object.fromEntries() method to do this. The searchParams.entries() method returns an iterator of all key-value pairs in the query parameters, and Object.fromEntries() transforms these pairs into an object. For example, if the URL is ?name=John&instrument=guitar, obj will become { name: "John", instrument: "guitar" }.

  return NextResponse.json(obj)
}