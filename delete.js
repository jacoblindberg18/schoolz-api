slask = async (req, res) => {
    try {
        let query = `EXEC DeleteActor ${req.params.Id}`;
        
        await sql.connect(config); //Connectar till min AzureDB, Films.
        await sql.query(query); // Den SP som anropas, antingen byID med ett nummer eller getactors. "Select * FROM ACTORS"
        console.log("Jag syns slask");
        res.status(204);
        return res.send(204, "Actor deleted");
    } catch (err) {
        //Throw slussar felet till postman.
        res.status(404);
        console.log(err);
        throw err;
    }
};