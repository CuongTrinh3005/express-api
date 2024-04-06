const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../data/member');

router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const found = members.some(member => member.id === id);
    if(found){
        res.json(members.filter(member => member.id === id));
    }
    else{
        res.status(404);
        res.json({message: `Member with id = ${id} not found!`});
    }
});

router.post('/', (req, res) => {
    const data = req.body;

    if(!data || !data.name || !data.email){
        res.status(400);
        return res.json({msg: 'Please enter valid inputs!'});
    }

    const newMember = {
        id: uuid.v4(),
        name: data.name,
        email: data.email,
        status: 'active'
    };

    members.push(newMember);

    res.json(members);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const found = members.some(member => member.id === id);
    if(found){
        const updatedMember = req.body;
        members.forEach(member => {
            if(member.id === id){
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
                member.status = updatedMember.status ? updatedMember.status : member.status;
            }
        });
        res.json({msg: 'Member Updated', member: members.filter(member => member.id === id)});
    }
    else{
        res.status(404);
        res.json({message: `Member with id = ${id} not found!`});
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const found = members.some(member => member.id === id);
    if(found){
        members.splice(members.findIndex(member => member.id === id), 1);
        res.json({msg: 'Member Deleted', members: members});
    }
    else{
        res.status(404);
        res.json({message: `Member with id = ${id} not found!`});
    }
});

module.exports = router;