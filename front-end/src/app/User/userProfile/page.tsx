"use server";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileInfo from "../../components/ProfileInfo";
import { getLoggedInUserProfile } from "../../services/user";



export default async function ProfilePage() {

 const res = await getLoggedInUserProfile();
 const user = res.user;
 console.log("User Profile:", user);

  return (
  <main className="">
      <div className="">
        <ProfileHeader />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div>
            <div className=" top-6">
              <ProfileAvatar
                initials={`${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`}
                name={`${user.firstName} ${user.lastName}`}
                role={user.role}
              />
            </div>
          </div>

          
          <div className="md:col-span-2">
            <ProfileInfo user={user} />
          </div>
        </div>
      </div>
    </main>
  );
}
