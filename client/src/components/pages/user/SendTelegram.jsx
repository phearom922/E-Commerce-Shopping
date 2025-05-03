// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { createOrderTelegram } from "../../functions/sendTelegram";
// import { toast } from "react-toastify";

// const SendTelegram = () => {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [orderTelegram, setOrderTelegram] = useState({
//     fullName: "",
//     phoneNumber: "",
//     pincode: "",
//     telegramChatId: "",
//   });

//   const handleSaveOrderTelegram = async (e) => {
//     e.preventDefault();

//     // ตรวจสอบข้อมูล
//     if (
//       !orderTelegram.fullName ||
//       !orderTelegram.phoneNumber ||
//       !orderTelegram.pincode ||
//       !orderTelegram.telegramChatId
//     ) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       await createOrderTelegram(user.token, orderTelegram);
//       setOrderTelegram({
//         fullName: "",
//         phoneNumber: "",
//         pincode: "",
//         telegramChatId: "",
//       });
//       toast.success("Order sent to Telegram successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to send order to Telegram");
//     }
//   };

//   return (
//     <div className="mx-auto mt-16 flex items-center h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
//       <form className="w-full flex flex-col items-center justify-center">
//         <p className="text-2xl text-gray-500 md:text-3xl">
//           Send Order to{" "}
//           <span className="font-semibold text-orange-600">Telegram</span>
//         </p>
//         <div className="mt-10 max-w-sm space-y-3">
//           <input
//             className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
//             type="text"
//             placeholder="Full name"
//             onChange={(e) =>
//               setOrderTelegram({ ...orderTelegram, fullName: e.target.value })
//             }
//             value={orderTelegram.fullName}
//           />
//           <input
//             className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
//             type="text"
//             placeholder="Phone number"
//             onChange={(e) =>
//               setOrderTelegram({ ...orderTelegram, phoneNumber: e.target.value })
//             }
//             value={orderTelegram.phoneNumber}
//           />
//           <input
//             className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
//             type="text"
//             placeholder="Pin code"
//             onChange={(e) =>
//               setOrderTelegram({ ...orderTelegram, pincode: e.target.value })
//             }
//             value={orderTelegram.pincode}
//           />
//           <input
//             className="w-full rounded border border-gray-500/30 px-2 py-2.5 text-gray-500 transition outline-none focus:border-orange-500"
//             type="text"
//             placeholder="Telegram Chat ID"
//             onChange={(e) =>
//               setOrderTelegram({
//                 ...orderTelegram,
//                 telegramChatId: e.target.value,
//               })
//             }
//             value={orderTelegram.telegramChatId}
//           />
//         </div>
//         <button
//           onClick={handleSaveOrderTelegram}
//           className="mt-6 w-full max-w-sm bg-orange-600 py-3 text-white uppercase hover:bg-orange-700"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SendTelegram;