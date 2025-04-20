"use client";

import { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox";
import { supabase } from "@/utils/supabase";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError("ユーザーデータの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <SearchBox onSearch={handleSearch} />
      <h1>ユーザーリスト</h1>

      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <p>ユーザーが見つかりませんでした。</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                作成日: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
