const billModel = require("../model/BillTask");

const createBill = async (req, res) => {
  try {
    const { billName, totalAmount, participants } = req.body;
    const createBill = await billModel.create({
      billName,
      totalAmount,
      participants,
    });
    await createBill.save();
    return res
      .status(201)
      .json({ message: "post bill created successfully", date: createBill });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllBills = async (req, res) => {
  try {
    const getBills = await billModel.find();
    return res.status(200).json({ data: getBills });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const getOneById = await billModel.findById(id);
    if (!getOneById) {
      return res.status(404).json({ message: "bill not found" });
    }
    return res
      .status(200)
      .json({ message: "User Bill Gotten successfully", data: getOneById });
  } catch (error) {}
};

const updateBill = async (req, res) => {
  try {
    const { billId, participantId } = req.params;
    const { billName, totalAmount, participantData } = req.body;

    const bill = await Bill.findById(billId);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    if (billName) bill.billName = billName;
    if (totalAmount) bill.totalAmount = totalAmount;

    const participant = bill.participants.find(
      (p) => p._id.toString() === participantId
    );

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    if (participantData.amountOwed !== undefined)
      participant.amountOwed = participantData.amountOwed;
    if (participantData.amountPaid !== undefined)
      participant.amountPaid = participantData.amountPaid;

    await bill.save();
    return res
      .status(200)
      .json({ message: "bill updated successfully", data: bill });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSpecifiUser = await billModel.findByIdAndDelete(id);
    if (!deleteSpecifiUser) {
      return res.status(404).json({ Message: "bill not Found" });
    }
    return res
      .status(200)
      .json({ message: "bill deleted succesfully", data: deleteSpecifiUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const splitBillEqually = async (req, res) => {
  try {
    const {id} = req.params
    const bill = await billModel.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    const splitAmount = bill.totalAmount / bill.participants.length;
    bill.participants.forEach((participant) => {
      participant.amountOwed = splitAmount;
    });
    await bill.save();
    return res.status(200).json(bill);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const checkOwedAmounts = async (req, res) => {
  try {
    const {id} = req.params
    const bill = await billModel.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    return res.status(200).json(bill.participants.amountOwed);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findFullPayments = async (req, res) => {
  try {
    const {id} = req.params
    const bill = await billModel.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    const paidParticipants = bill.participants.filter(
      (participant) => participant.amountOwed <= participant.amountPaid
    );
    return res.status(200).json(paidParticipants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const trackOverpayments = async (req, res) => {
  try {
    const {id} = req.params
    const bill = await billModel.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    const overpaidParticipants = bill.participants.filter(
      (participant) => participant.amountPaid > participant.amountOwed
    );
    return res.status(200).json(overpaidParticipants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findTopPayer = async (req, res) => {
  try {
    const {id} = req.params
    const bill = await billModel.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    const topPayer = bill.participants.reduce(
      (max, participant) =>
        participant.amountPaid > max.amountPaid ? participant : max,
      bill.participants[0]
    );
    return res.status(200).json(topPayer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const findTotalMoneyPaid = async (req, res) => {
  try {
    const {id} = req.params
    const bill = await billModel.findById(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    const totalPaid = bill.participants.reduce(
      (sum, participant) => sum + participant.amountPaid,
      0
    );
    return res.status(200).json({ totalPaid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createBill, getAllBills, getOne, updateBill, deleteById, splitBillEqually, checkOwedAmounts, findFullPayments, trackOverpayments,
    findTopPayer, findTotalMoneyPaid
 };
