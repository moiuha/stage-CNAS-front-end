"use server";

import ProfileAvatar from "../../../components/ProfileAvatar";
import ProfileInfo from "../../../components/ProfileInfo";
import { getUserById } from "../../../services/user";
import DeleteUserButton from "../../../components/DeleteUserButton";
import AdminProfileHeader from "../../../components/AdminProfileHeader";



export default async function AdminUserInfoPage({ params }: { params: { id: number } }) {
  
  const { id } = params;
  console.log("Type of id:", typeof id);    
  console.log("id value:", id);

  const res = await getUserById(Number(id));
  console.log("User data:", res);
  const user = res.user || res.userData || res;
  console.log("user role", user.role);
  const isAdmin = user.role === "ADMIN";
  
  return (
    <main className="">
      <div className="">
        <AdminProfileHeader />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="top-6">
              <ProfileAvatar
                initials={`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`}
                name={`${user.firstName} ${user.lastName}`}
                role={user.role}
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <ProfileInfo user={user} />


            

            {!isAdmin && (
                <div className="flex justify-end">
                    <DeleteUserButton userId={user.userId} />
                </div>
            )}
           
          </div>
        </div>
      </div>
    </main>
    );
  }
  