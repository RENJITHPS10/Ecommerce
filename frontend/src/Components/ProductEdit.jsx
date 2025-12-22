import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios"; 
import API from "./api.js"; 

function ProductPage() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({ pname:"", price:"", category:"", soldcount:0 });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  
  const { data: products = [] } = useQuery({
    queryKey:["products"],
    queryFn:async()=>{
      const res = await API.get("http://localhost:5000/api/v1/product/all");
      return res.data.readproduct;
    }
  });

  
  const addProduct = useMutation({
    mutationFn:async()=>{
      const formData = new FormData();
      Object.entries(form).forEach(([k,v])=> formData.append(k,v));
      if(file) formData.append("file",file);
      return API.post("http://localhost:5000/api/v1/product/create",formData);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["products"]);
      resetForm();
      alert("Product Added");
    }
  });

 
  const updateProduct = useMutation({
    mutationFn:async()=>{
      const formData = new FormData();
      Object.entries(form).forEach(([k,v])=> formData.append(k,v));
      if(file) formData.append("file",file);
      return API.put(`/update/${editingId}`,formData);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["products"]);
      resetForm();
      alert("Product Updated");
      setEditingId(null);
    }
  });

  
  const deleteProduct = useMutation({
    mutationFn:(id)=> API.delete(`/delete/${id}`),
    onSuccess:()=> queryClient.invalidateQueries(["products"])
  });

  const handleSubmit = (e)=>{
    e.preventDefault();
    editingId ? updateProduct.mutate() : addProduct.mutate();
  };

  const editProduct = (p)=>{
    setEditingId(p._id);
    setForm({ pname:p.pname, price:p.price, category:p.category, soldcount:p.soldcount });
    setPreview(p.image);
  };

  const resetForm = ()=>{
    setForm({ pname:"", price:"", category:"", soldcount:0 });
    setFile(null);
    setPreview(null);
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-center text-2xl font-bold mb-3">
        Product Dashboard 🛍
      </h1>

     
      <form onSubmit={handleSubmit} className="border p-4 rounded grid gap-2">

        <input placeholder="Product Name" value={form.pname}
          onChange={(e)=>setForm({...form,pname:e.target.value})} required />

        <input type="number" placeholder="Price" value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})} required />

        <input placeholder="Category" value={form.category}
          onChange={(e)=>setForm({...form,category:e.target.value})} required />

        <input type="number" placeholder="Sold Count" value={form.soldcount}
          onChange={(e)=>setForm({...form,soldcount:e.target.value})} />

        <input type="file"
          onChange={(e)=>{
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />

        {preview && <img src={preview} className="w-32 h-32 object-cover rounded" />}

        <button type="submit" className="bg-black text-white p-2 rounded">
          {editingId? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button type="button" className="bg-gray-400 p-2 rounded text-white" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>


      
      <h2 className="mt-6 text-xl font-semibold">Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
        {products.length>0 ? products.map(p=>(
          <div key={p._id} className="border p-3 rounded text-center">
            <img src={p.image} className="w-full h-32 object-cover rounded" />
            <h3 className="font-bold">{p.pname}</h3>
            <p>₹{p.price}</p>
            <p>{p.category}</p>

            <button onClick={()=>editProduct(p)} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
              Edit
            </button>

            <button onClick={()=>deleteProduct.mutate(p._id)} className="bg-red-500 text-white px-3 py-1 rounded mt-2 ml-2">
              Delete
            </button>
          </div>
        )) : <p>No products yet</p>}
      </div>
    </div>
  );
}

export default ProductPage;
