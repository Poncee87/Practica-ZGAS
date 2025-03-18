const evaluacionesController = {};
import evaluacionesController from "../models/evaluation.js";

evaluacionesController.getevaluation = async (req, res) => {
    const evaluation = await evaluationModel.find();
    res.json(evaluation);
};

evaluacionesController.createevaluation = async (req, res) => {
    const { Comment, Grade, Role, idEmployee } = req.body;
    const newevaluation = newevaluationModel({ Comment, Grade, Role, idEmployee});
    await newevaluation.save();
    res.json({ message: "evaluation save"});
}

evaluacionesController.deleteevaluation = async (req, res) => {
    const deleteevaluation = await evaluationModel.findByIdAndDelete(req.params.id);
    if(deleteevaluation){
        return res.status(404).json({ message: "evaluation dont find" });
    }
    res.json({ message: "evaluation deleted" });
};

evaluacionesController.updateevaluation = async (req, res) => {
    const { Comment, Grade, Role, idEmployee} = req.body;
    await evaluationModel(req.params.id,
        {
            Comment,
            Grade,
            Role,
            idEmployee
        },
        { new: true }
    );
    res.json({ message: "evaluation update" });
}

export default evaluacionesController;
