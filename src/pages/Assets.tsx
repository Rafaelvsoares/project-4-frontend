import React from "react"


function Assets() {
  const [assets, setAssets] = React.useState<any>()

  React.useEffect(() => {
    async function getProducts() {
      const req = await fetch("/api/products")
      const data = await req.json()
      setAssets(data)
    }
    getProducts()
  },[])

  if(!assets){
    return <h1>Loading</h1>
  }
  console.log(assets[0])
  return (
    <h1>Assets Page</h1>
  )
}

export default Assets

