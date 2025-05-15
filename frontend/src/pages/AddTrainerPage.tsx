import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { getAllTrainers, addTrainersToUser, getUserTrainers, Trainer } from "../services/trainers.service";
import BreadcrumbsNavigation from "../components/Breadcrumbs/Breadcrumbs";
import AllTrainersList from "../components/MyAccount/AddTrainer/AllTrainersList";
import MyTrainersList from "../components/MyAccount/AddTrainer/MyTrainersList";

const AddTrainerPage: React.FC = () => {
  const [allTrainers, setAllTrainers] = useState<Trainer[]>([]);
  const [myTrainers, setMyTrainers] = useState<Trainer[]>([]);
  const [selectedTrainers, setSelectedTrainers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const all = await getAllTrainers();
      const my = await getUserTrainers();
      setAllTrainers(all);
      setMyTrainers(my);
      setSelectedTrainers(my.map((trainer) => trainer.id));
    };

    fetchData();
  }, []);

  const handleSelectTrainer = (id: string) => {
    setSelectedTrainers((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAddTrainers = async () => {
    const response = await addTrainersToUser(selectedTrainers);
    if (response.success) {
      const newlyAdded = allTrainers.filter((trainer) =>
        response.addedTrainerIds.includes(trainer.id)
      );
      setMyTrainers((prev) => [...prev, ...newlyAdded]);
      setSelectedTrainers([]);
    }
  };

  return (
    <Box mx={12} mt={5}>
      <BreadcrumbsNavigation />
      <Typography variant="h1" sx={{ textAlign: "center", mb: 5 }}>
        Add Trainer
      </Typography>
      <Typography sx={{ mb: 5, textAlign: "center" }}>
        Please select trainers to add them to your list. <br />
        * Trainers cannot be removed once added.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
        <AllTrainersList
          trainers={allTrainers}
          selectedTrainers={selectedTrainers}
          onSelectTrainer={handleSelectTrainer}
        />
        <MyTrainersList myTrainers={myTrainers} />
      </Box>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddTrainers}
          disabled={selectedTrainers.length === 0}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddTrainerPage;
