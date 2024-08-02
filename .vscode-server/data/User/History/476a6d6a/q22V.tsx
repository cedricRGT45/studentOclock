{displayedData === "wizards" && wizardsData?.map((wizard: Wizard) => (
    <div key={wizard.id}>
        <Card 
            data={wizard} 
            dataType="wizard"
            is_staff={userRole ? userRole.is_staff : false} 
            openModal={openModal} 
            setOpenModal={setOpenModal} 
            setEditedData={setEditedData} 
            setWizardData={setWizardsData}
        />
    </div>
))}
{displayedData === "classes" && classesData?.map((classItem: Class) => (
    <div key={classItem.id}>
        <Card 
            data={classItem} 
            dataType="class"
            is_staff={userRole ? userRole.is_staff : false} 
            openModal={openModal} 
            setOpenModal={setOpenModal} 
            setEditedData={setEditedData} 
            setClassData={setClassesData}
        />
    </div>
))}
{displayedData === "rooms" && roomsData?.map((room: Room) => (
    <div key={room.id}>
        <Card 
            data={room} 
            dataType="room"
            is_staff={userRole ? userRole.is_staff : false} 
            openModal={openModal} 
            setOpenModal={setOpenModal} 
            setEditedData={setEditedData} 
            setRoomData={setRoomsData}
        />
    </div>
))}
