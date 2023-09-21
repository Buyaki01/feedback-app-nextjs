"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
  name: "",
  email: "",
  message: "",
}

export default function Feedback() {
  const [data, setData] = useState(initState)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(JSON.stringify(data))

    const { name, email, message } = data

    // Send data to API route
    const res = await fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, message
      })
    })

    const result = await res.json()
    console.log(result)

    // Navigate to thank you
    router.push(`/thank-you/`)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name

    setData(prevData => ({
      ...prevData,
      // square brackets [name] used in JavaScript object literals, this notation is known as "computed property names."
      // In JavaScript, when you define an object literal (i.e., an object created using curly braces {}), you can use square brackets to specify the property name as an expression. This means that the property name is not a fixed, hardcoded string but is computed at runtime.
      [name]: e.target.value //This is the name attribute of the HTML input or textarea element that triggered the event. It's used as the property name.
    }))
  }

  const canSave = [...Object.values(data)].every(Boolean)

  const content = (
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6">
      <h1 className="text-4xl mb-4">Contact Us</h1>

      <label className="text-2xl mb-1" htmlFor="name">Name:</label>
      <input
        className="p-3 mb-6 text-2xl rounded-2xl text-black" 
        type="text"
        id="name"
        name="name"
        placeholder="Jane"
        //The {1,} in a regular expression is called a "quantifier," and it specifies how many times the preceding pattern should be matched. In this case, {1,} means "match the preceding pattern (which is [\w+.]) at least one time or more." i.e A., A123, A+, A+B, A123+
        //[\w+.] matches one of the following characters: a word character (letter, digit, or underscore), a plus symbol, or a dot
        pattern="([A-Z])[\w+.]{1,}" //The input must start with a capital letter (A to Z). After the initial capital letter, there must be one or more characters, and these characters can be either word characters (letters, digits, underscores) or plus symbols.
        value={data.name}
        onChange={handleChange}
        autoFocus
      />

      <label className="text-2xl mb-1" htmlFor="email">Email:</label>
      <input
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        type="email"
        id="email"
        name="email"
        placeholder="Jane@yoursite.com"
        // [a-zA-Z0-9._%+-]: It matches any lowercase letter (a-z), uppercase letter (A-Z), digit (0-9), or specific characters like period (.), underscore (_), percent (%), plus (+), and hyphen (-)
        // +: This means that one or more of these characters should be present in the local part of the email address.
        // @: This is a literal "@" symbol, which separates the local part from the domain part in an email address
        // [a-zA-Z0-9.-]: It matches any lowercase letter (a-z), uppercase letter (A-Z), digit (0-9), period (.), or hyphen (-).
        // +: This means that one or more of these characters should be present in the domain name.
        // \.: This is a literal period (.) symbol. It's used to match the dot that separates the domain name from the top-level domain (TLD) in the email address.
        // [a-zA-Z]: It matches any lowercase letter (a-z) or uppercase letter (A-Z).
        // {2,}: This means that there should be at least two or more TLD characters. In practice, this ensures that the TLD is a valid length, like "com," "org," "net," etc.
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        value={data.email}
        onChange={handleChange}
      />

      <label className="text-2xl mb-1" htmlFor="message">Message:</label>
      <textarea
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        id="message"
        name="message"
        placeholder="Your message here..."
        rows={5}
        cols={33}
        value={data.message}
        onChange={handleChange}
      />

      <button
        className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
        disabled={!canSave}
      >Submit</button>

    </form>
  )

  return content
}