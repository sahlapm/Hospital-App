const express = require('express');
const app=new express();
app.use(express.json());
const data = require('./dataset.json');
const fs = require('fs');


app.get('/hospital',(req,res)=>
{
res.send(data);
}
);

app.post('/hospital',(req,res)=>
{
    data.push(req.body);
    fs.writeFile('dataset.json', JSON.stringify(data),(err,resp)=>
    {
        if(err)
        {
            res.send("Data cannot be written");
        }
        else
        {
            {
                res.send("Data written successfully");
            }
        }
    }
    );

}
);


app.put('/hospital/:name',(req,res)=>
{
    let name=req.params.name;
    data.forEach((item)=>
    {
        if(item.hospitalName==name)
        {
            item.patientCount=req.body.patientCount;
            item.Location=req.body.Location;
        }
    })
    fs.writeFile('dataset.json', JSON.stringify(data),(err,resp)=>
    {
        if(err)
        {
            res.send("Data cannot be updated");
        }
        else
        {
            {
                res.send("Data updated successfully");
            }
        }
    }
    );
}
);

app.delete('/hospital/:name',(req,res)=>
{
    let name=req.params.name;
   let value=data.filter((item)=> item.hospitalName !=name);
    fs.writeFile('dataset.json', JSON.stringify(value),(err,resp)=>
    {
        if(err)
        {
            res.send("Data cannot be deleted");
        }
        else
        {
            {
                res.send("Data deleted successfully");
            }
        }
    }
    );
}
);
      //listen to port
      app.listen(3000,()=>
      {
          console.log('server is listening to 3000');
          console.log(data);
      })
  