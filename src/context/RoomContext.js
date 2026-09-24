import React, { createContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([
    { id: '1', name: 'Phòng Lab 01', capacity: 30, status: 'available' },
    { id: '2', name: 'Phòng Lab 02', capacity: 25, status: 'available' },
    { id: '3', name: 'Phòng Học A1', capacity: 50, status: 'occupied', bookedBy: 'Nguyễn Văn A' },
    { id: '4', name: 'Phòng Học A2', capacity: 40, status: 'available' },
    { id: '5', name: 'Phòng Lab 03', capacity: 20, status: 'available' },
  ]);

  // Hàm đặt phòng
  const bookRoom = (roomId, userName) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, status: 'occupied', bookedBy: userName } 
          : room
      )
    );
  };

  // Hàm huỷ đặt phòng (tuỳ chọn thêm)
  const cancelBooking = (roomId) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, status: 'available', bookedBy: null } 
          : room
      )
    );
  }

  return (
    <RoomContext.Provider value={{ rooms, bookRoom, cancelBooking }}>
      {children}
    </RoomContext.Provider>
  );
};
