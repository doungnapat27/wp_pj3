const express=require('express');
const app=express();
const mysql=require('mysql');
const cors =require('cors');
const dotenv=require("dotenv");
const bodyParser =require('body-parser');
const jsonParser=bodyParser.json();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {promisify}= require('util');

app.use(cors());
app.use(express.json());
dotenv.config({});

let dbCon = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

dbCon.connect(function(error){
    if(error){
        console.log(error);
    }
    console.log("Connected to DB:"+process.env.MYSQL_DATABASE);
});

app.get('/account',(req,res)=>{
    dbCon.query('SELECT uid,fname,lname,email, pwd, gender,tel, l_role,day(DOB) as d,month(DOB) as m, year(DOB) as y FROM personal_info ',(error,result)=>{
        if (error){
            console.log(error);
            return;
        }
        return res.send({result});
    });
});

app.get('/account/:uid',jsonParser,(req,res)=>{
    dbCon.query('SELECT fname,lname,email, pwd, gender,tel, l_role,day(DOB) as d,month(DOB) as m, year(DOB) as y FROM personal_info WHERE uid= ?',[req.params.uid],(error,result)=>{
        if (error){
            console.log(error);
            return;
        }
        console.log({result});
        return res.send({result});
    });
});

app.delete('delete_account/:uid',jsonParser,(req,res)=>{
    dbCon.query('DELETE FROM address WHERE cuid=?',[req.params.uid],(error,result)=>{
        if (error){
            console.log(error);
        }
        dbCon.query('DELETE FROM personal_info WHERE uid=?',[req.params.uid],(error,result)=>{
            if (error){
                console.log(error);
                res.json({status:'failed',message: 'delete failed'});
                return;
            }
            console.log({result});
            res.json({status:'success',message: 'delete successfully'});
        });
    });
});

app.get('/address',(req,res)=>{
    dbCon.query('SELECT * FROM address',(error,result)=>{
        if (error){
            console.log(error);
            return;
        }
        return res.send({result});
    });
});

app.get('/product/:pid',(req,res)=>{
    dbCon.query('SELECT * FROM product p INNER JOIN category c ON p.cid = c.cid WHERE p.pid=?',[req.params.pid],(error,result)=>{
        if (error){
            console.log(error);
            return;
        }
        return res.send(result);
    });
});

app.get('/addressID/:aid',(req,res)=>{
    dbCon.query('SELECT * FROM address WHERE aid=?',[req.params.aid],(error,result)=>{
        if (error){
            console.log(error);
            return;
        }
        return res.send({result});
    });
});

app.get('/address/:cuid',jsonParser,(req,res)=>{
    dbCon.query('SELECT * FROM address WHERE cuid =?',[req.params.cuid],(error,result)=>{
        if (error){
            console.log(error);
            return;
        }
        console.log({result});
        return res.send({result});
    });
});


app.post('/insert_address/:cuid',jsonParser,(req,res)=>{
    console.log(req.body);
    const {afname,alname,atel,city,province,zipcode,adescr,ccoid}=req.body;
    dbCon.query('INSERT INTO address SET ?',{afname:afname,alname:alname,atel:atel,city:city,province:province,zipcode:zipcode,adescr:adescr,ccoid:ccoid,cuid:req.params.cuid},(error,address)=>{
        if (error){
            console.log(error);
            res.json({status:'failed',message: 'insert failed'});
            return;
        }
        console.log(address);
        res.json({status:'success',message: 'insert successfully'});
    });
});

app.delete('/delete_address/:aid',jsonParser, (req,res)=>{
    dbCon.query('DELETE FROM address WHERE aid=?',[req.params.aid],(error,address)=>{
        if (error){
            console.log(error);
            res.json({status:'failed',message: 'delete failed'});
            return;
        }
        console.log('address delete successfully')
        res.json({status:'success',message: 'delete successfully'});
    });
});


app.post('/insert_account',jsonParser,async function(req,res){
    console.log(req.body);
    const {fname,lname,email,pwd,gender,DOB,l_role,tel} =req.body;
    try{
    dbCon.query('SELECT email FROM personal_info WHERE email = ?',[email],async(error,results)=>{
        if (error){
            console.log(error);
            return;
        }
        if(results.length>0){
            res.json({status:'failed',message: 'That email is already in use'});
            return;
        }
        let hashedPassword=await bcrypt.hash(pwd,8);
        console.log(hashedPassword);
        dbCon.query('INSERT INTO personal_info SET ?',{fname:fname,lname:lname,email:email,gender:gender,DOB:DOB,l_role:l_role,tel:tel,pwd:hashedPassword},(error,results)=>{
            if (error) {
                console.log(error);
            }
            console.log(results);
            res.json({status:'ok'})
        });
    });
}
    catch(error){
        console.log(error);
    }
});

app.put('/update_address/:cuid/:aid', jsonParser, (req, res) => {
    console.log(req.body);
    const { afname, alname, atel, city, province, zipcode, adescr, ccoid } = req.body;
    dbCon.query('UPDATE address SET ? WHERE aid=?', [{ afname: afname, alname: alname, atel: atel, city: city, province: province, zipcode: zipcode, adescr: adescr, ccoid: ccoid, cuid:req.params.cuid}, req.params.aid], (error, address) => {
        if (error){
            console.log(error);
            res.json({status:'failed',message: 'update failed'});
            return;
        }
        console.log(address);
        res.json({status:'success',message: 'update successfully'});

    });
});

app.put('/update_account_A/:uid', jsonParser, async (req, res) => {
    console.log(req.body);
    const {fname,lname,tel,DOB,gender,l_role,pwd,email}=req.body;
    let hashedPassword=await bcrypt.hash(pwd,8);
    dbCon.query('SELECT email FROM personal_info WHERE email = ?',[email],async(error,results)=>{
        if (error){
            console.log(error);
            return;
        }
        if(results.length>0){
            res.json({status:'failed',message: 'That email is already in use'});
            return;
        }
        else{
            if(DOB!==''&& gender==''){
                dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,DOB:DOB,l_role:l_role,pwd:hashedPassword,email:email},req.params.uid],(error,address)=>{
                    if (error){
                        console.log(error);
                        res.json({status:'failed',message: 'update failed'});
                        return;
                    }
                    console.log(address);
                    res.json({status:'success',message: 'update successfully'});
                });
            }
            else if(gender!=''&&DOB==''){
                dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,gender:gender,l_role:l_role,pwd:hashedPassword,email:email},req.params.uid],(error,address)=>{
                    if (error){
                        console.log(error);
                        res.json({status:'failed',message: 'update failed'});
                        return;
                    }
                    console.log(address);
                    res.json({status:'success',message: 'update successfully'});
                });
            }
            else if(gender==''&&DOB==''){
                dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,l_role:l_role,pwd:hashedPassword,email:email},req.params.uid],(error,address)=>{
                    if (error){
                        console.log(error);
                        res.json({status:'failed',message: 'update failed'});
                        return;
                    }
                    console.log(address);
                    res.json({status:'success',message: 'update successfully'});
                });
            }
            else{
                dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,DOB:DOB,gender:gender,l_role:l_role,pwd:hashedPassword,email:email},req.params.uid],(error,address)=>{
                    if (error){
                        console.log(error);
                        res.json({status:'failed',message: 'update failed'});
                        return;
                    }
                    console.log(address);
                    res.json({status:'success',message: 'update successfully'});
                });
            }

        }
});
});


app.put('/update_account/:uid', jsonParser, (req, res) => {
    console.log(req.body);
    const {fname,lname,tel,DOB,gender}=req.body;
    if(DOB!==''&& gender==''){
        dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,DOB:DOB},req.params.uid],(error,address)=>{
            if (error){
                console.log(error);
                res.json({status:'failed',message: 'update failed'});
                return;
            }
            console.log(address);
            res.json({status:'success',message: 'update successfully'});
        });
    }
    else if(gender!=''&&DOB==''){
        dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,gender:gender},req.params.uid],(error,address)=>{
            if (error){
                console.log(error);
                res.json({status:'failed',message: 'update failed'});
                return;
            }
            console.log(address);
            res.json({status:'success',message: 'update successfully'});
        });
    }
    else if(gender==''&&DOB==''){
        dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel},req.params.uid],(error,address)=>{
            if (error){
                console.log(error);
                res.json({status:'failed',message: 'update failed'});
                return;
            }
            console.log(address);
            res.json({status:'success',message: 'update successfully'});
        });
    }
    else{
        dbCon.query('UPDATE personal_info SET ? WHERE uid=?',[{fname:fname,lname:lname,tel:tel,DOB:DOB,gender:gender},req.params.uid],(error,address)=>{
            if (error){
                console.log(error);
                res.json({status:'failed',message: 'update failed'});
                return;
            }
            console.log(address);
            res.json({status:'success',message: 'update successfully'});
        });
    }
});


app.post('/register',jsonParser,async function(req,res){
    console.log(req.body);
    const {fname,lname,email,pwd} =req.body;
    try{
    dbCon.query('SELECT email FROM personal_info WHERE email = ?',[email],async(error,results)=>{
        if (error){
            console.log(error);
            return;
        }
        if(results.length>0){
            res.json({status:'failed',message: 'That email is already in use'});
            return;
        }
        let hashedPassword=await bcrypt.hash(pwd,8);
        console.log(hashedPassword);
        dbCon.query('INSERT INTO personal_info SET ?',{fname:fname,lname:lname,email:email, pwd:hashedPassword},(error,results)=>{
            if (error) {
                console.log(error);
            }
            console.log(results);
            res.json({status:'ok'})
        });
    });
}
    catch(error){
        console.log(error);
    }
});

app.post('/login',jsonParser,async function(req,res){
    try{
        const {email,pwd}=req.body;
        dbCon.query('SELECT * FROM personal_info WHERE email = ?',[email], async(error,result)=>{
            if(!result){
                console.log(req.body);
                res.json({status:'failed' ,message:'password or email is wrong'});
                return;
            }
            if(!(await bcrypt.compare(pwd,result[0].pwd))){
                res.json({status:'failed' ,message:'password or email is wrong'});
                return;
            }
            else{
                const uid=result[0].uid;
                const token =jwt.sign({uid},process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRE_IN
                });
                const cookieOptions ={
                    expires: new Date (Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly:true
                }
                res.cookie('jwt',token,cookieOptions);
                res.json({status: 'login success',token,cookieOptions});
            }
        });
    }
    catch(error){
        console.log(error);
        return;
    }

});
app.post('/auth',jsonParser,async function(req,res){
    try{
        const token =req.headers.authorization.split(' ')[1]
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        res.json({status:'ok',decoded,token});
    }
    catch(error){
        res.json({status:'error', messgae: error.message});
    }
});

app.post('/authA',jsonParser,async function(req,res){
    try{
        const token =req.headers.authorization.split(' ')[1]
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
        dbCon.query('SELECT l_role FROM personal_info WHERE uid= ?',[decoded.uid], async(error,admin)=>{
            res.json({status:'ok',decoded,token,admin});
        });
    }
    catch(error){
        res.json({status:'error', messgae: error.message});
    }
});


app.post('/search',jsonParser,(req,res)=>{
    const {ctname,price,p_name} =req.body;
    console.log(req.body);
        try{
            if(ctname!=="all" && price==="all"){
                dbCon.query('SELECT * FROM product p INNER JOIN category c ON p.cid = c.cid WHERE p.p_name LIKE ? AND c.ctname = ?',['%'+p_name+'%',ctname],(error,results)=>{
                    console.log({results});
                    if(error){
                        console.log(error);
                        return;
                    }
                    if(!results){
                        res.json({status:'none' ,message:'no result'});
                        return;
                    }
                    return res.send({results});
                });
            }
            else if (ctname==="all"&& price==="all"){
                dbCon.query('SELECT * FROM product p INNER JOIN category c ON p.cid = c.cid WHERE p.p_name LIKE ?',['%'+p_name+'%'],(error,results)=>{
                    console.log({results});
                    if(error){
                        console.log(error);
                        return;
                    }
                    if(!results){
                        res.json({status:'none' ,message:'no result'});
                        return;
                    }
                    return res.send({results});
                });
            }
            else if (ctname==="all" && price!=="all"){
                dbCon.query('SELECT * FROM product p INNER JOIN category c ON p.cid = c.cid WHERE p.price >= ?  AND p.p_name LIKE ? ORDER BY p.price ',[price,'%'+p_name+'%'],(error,results)=>{
                    console.log({results});
                    if(error){
                        console.log(error);
                        return;
                    }
                    if(!results){
                        res.json({status:'none' ,message:'no result'});
                        return;
                    }
                    return res.send({results});
                });
            }
            else if (ctname!=="all" && price!=="all"){
                dbCon.query('SELECT * FROM product p INNER JOIN category c ON p.cid = c.cid WHERE p.p_name LIKE ? AND c.ctname =? AND p.price >=?',['%'+p_name+'%',ctname,price],(error,results)=>{
                    console.log({results});
                    if(error){
                        console.log(error);
                        return;
                    }
                    if(!results){
                        res.json({status:'none' ,message:'no result'});
                        return;
                    }
                    return res.send({results});
                });
            }
        }
        catch(error){
            console.log(error);
            return;
        }
});

app.post('/searchU',jsonParser,(req,res)=>{
    const {gender,uid,fname,lname} =req.body;
    console.log(req.body);
        try{

            if(gender!='all'){
                dbCon.query('SELECT * FROM personal_info WHERE fname LIKE ? AND lname LIKE ? AND uid LIKE ? AND gender LIKE ?',['%'+fname+'%','%'+lname+'%','%'+uid+'%','%'+gender+'%'],(error,results)=>{
                    console.log({results});
                    if(error){
                        console.log(error);
                        return;
                    }
                    if(!results){
                        res.json({status:'none' ,message:'no result'});
                        return;
                    }
                    return res.send({results});
                });
            }
            else{
                dbCon.query('SELECT * FROM personal_info WHERE fname LIKE ? AND lname LIKE ? AND uid LIKE ?',['%'+fname+'%','%'+lname+'%','%'+uid+'%','%'+gender+'%'],(error,results)=>{
                    console.log({results});
                    if(error){
                        console.log(error);
                        return;
                    }
                    if(!results){
                        res.json({status:'none' ,message:'no result'});
                        return;
                    }
                    return res.send({results});
                });

            }
        }
        catch(error){
            console.log(error);
            return;
        }
});

app.listen(3001,() =>{
    console.log("Server listening at Port 3001");
});