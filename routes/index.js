const express = require('express');
const router = new express.Router();
const fs = require('fs');


router.use(express.json());
router.use(express.urlencoded({ extended: true }))

let hospital_datas = require("../model/hospital_data.json")
var jsonFilePath = "model/hospital_data.json";
/**   
 * For getting hospital datas
 * @return {json}
*/
router.get('/datas', (req, res) => {
    res.send({
        "data": hospital_datas
    });
})

router.post("/add", (req, res) => {

    fs.readFile("model/hospital_data.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }

        const jsonData = JSON.parse(data);

        jsonData.push(req.body);

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing file');
                return;
            }

            res.send('Value updated successfully');
        });
    });

});

router.delete('/delete/:id', (req, res) => {
    const keyToDelete = req.params.id;
    let response = "";

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }

        let jsonData = JSON.parse(data);

        let index = jsonData.findIndex(obj => obj.id == keyToDelete);

        if (index !== -1) {
            s = jsonData.splice(index, 1);
    
            fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    response = err;
                } else {
                    response = `Object with id ${keyToDelete} deleted successfully.`;
                    res.send(response);
                }
            });
        } else {
            response = `Object with id ${keyToDelete} not found.`;
            res.send(response);
        }
    });
});

module.exports = router
