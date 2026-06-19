'use server';

//----------------Post Mutation Handler: ----------------------------
export const postMutation = async (url, data) => {
    // Server layer code directly local process variables search
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    try {
        const res = await fetch(`${baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store' // Caching bypass validation handling node
        });

        // 🔒 Robust Safety Checklist
        if (!res.ok) {
            const rawText = await res.text();
            console.error("🔴 Server crash HTML payload parsing logs:", rawText);
            return { error: true, status: res.status };
        }

        return await res.json();
    } catch (err) {
        console.error("🛑 Connectivity issue connecting database port pipeline:", err);
        return { error: true, message: "Server connection failed!" };
    }
};

//----------------Delete Mutation Handler: ----------------------------

export const deleteMutation = async (url) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}${url}`, {
        method: "DELETE",
        cache: "no-store",
    });

    return await res.json();
};

//----------------patch Mutation Handler: ----------------------------
export const patchMutation = async(url ,data)=>{
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}${url}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(data),
         cache: "no-store",
    });

    return await res.json();
}


export const getMutation = async (url) => {
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
   const res = await fetch(`${baseUrl}${url}`,{
       cache: "no-store",});
   return await res.json();
};