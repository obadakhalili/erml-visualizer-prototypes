import React, { useState } from "react"
import { Diagram, createSchema, useSchema } from "beautiful-react-diagrams"
import "beautiful-react-diagrams/styles.css"

function Entity(props: any) {
  return (
    <div
      style={{
        width: 100,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid",
        borderRadius: 5,
      }}
    >
      <b>{props.content}</b>
    </div>
  )
}

function WeakEntity(props: any) {
  return (
    <div
      style={{
        width: 100,
        height: 50,
        display: "flex",
        borderWidth: 4,
        border: "5px double",
        borderRadius: 5,
      }}
    >
      <div style={{ alignSelf: "center", margin: "0 auto" }}>
        <b style={{ textAlign: "center" }}>{props.content}</b>
      </div>
      {/* <div>
        {props.inputs.map((port: any, idx: any) =>
          React.cloneElement(port, {
            style: {
              position: "absolute",
              width: 12.5,
              height: 12.5,
              top: 20 * (idx + 1),
              left: 5,
              transform: "translateY(-50%)",
              backgroundColor: "#000",
            },
          })
        )}
      </div> */}
    </div>
  )
}

function Attribute(props: any) {
  return (
    <div
      style={{
        width: 100,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #073b4c",
        borderRadius: "100%",
      }}
    >
      <b>{props.content}</b>
    </div>
  )
}

function PrimaryAttribute(props: any) {
  return (
    <div
      style={{
        width: 100,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #073b4c",
        borderRadius: "100%",
      }}
    >
      <b style={{ textDecoration: "underline" }}>{props.content}</b>
    </div>
  )
}

function PartialAttribute(props: any) {
  return (
    <div
      style={{
        width: 100,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #073b4c",
        borderRadius: "100%",
      }}
    >
      <b
        style={{
          textDecorationLine: "underline",
          textDecorationStyle: "dashed",
        }}
      >
        {props.content}
      </b>
    </div>
  )
}

function DerivedAttribute(props: any) {
  return (
    <div
      style={{
        width: 100,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px dashed #073b4c",
        borderRadius: "100%",
      }}
    >
      <b>{props.content}</b>
    </div>
  )
}

function IdenRel(props: any) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "5px double",
        transform: "rotate(45deg)",
      }}
    >
      <b style={{ transform: "rotate(-45deg)" }}>{props.content}</b>
    </div>
  )
}

const initialSchema = createSchema({
  nodes: [
    {
      id: "User",
      content: "User",
      coordinates: [139, 169],
      render: Entity,
    },
    {
      id: "ID",
      content: "ID",
      coordinates: [59, 44],
      render: PrimaryAttribute,
    },
    {
      id: "DoB",
      content: "DoB",
      coordinates: [211, 44],
      render: Attribute,
    },
    {
      id: "Age",
      content: "Age",
      coordinates: [16, 253],
      render: DerivedAttribute,
    },
    {
      id: "Book",
      content: "Book",
      coordinates: [1160, 169],
      inputs: [{ id: "port-1" }, { id: "port-2" }],
      render: WeakEntity,
    },
    {
      id: "Name",
      content: "Name",
      coordinates: [1250, 44],
      render: PartialAttribute,
    },
    {
      id: "Borrow",
      content: "Borrow",
      coordinates: [625, 250],
      render: IdenRel,
    },
  ],
  links: [
    { input: "User", output: "ID" },
    { input: "User", output: "DoB" },
    { input: "User", output: "Age" },
    { input: "User", output: "Borrow" },
    { input: "Book", output: "Name" },
    { input: "Book", output: "Borrow" },
  ],
})

export default function UncontrolledDiagram() {
  const [locked, toggleLock] = useState(true)
  const [schema, diagramMethods] = useSchema(initialSchema)

  return (
    <>
      <div style={{ height: "22.5rem" }}>
        <Diagram schema={schema} onChange={handleDiagramChange} />
      </div>
      <button onClick={handleLockClick}>{locked ? "unlock" : "lock"}</button>
    </>
  )

  function handleLockClick() {
    toggleLock((locked) => !locked)
  }

  function handleDiagramChange(change: any) {
    if (!locked) {
      diagramMethods.onChange(change)
    }
  }
}
