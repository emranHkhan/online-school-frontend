import Back from "../common/back/Back"
import TeamCard from "./TeamCard"
import "./team.css"
import "../about/about.css"
import { useEffect, useState } from "react"
import api from "../../utils/axiosInstance.js"

const Team = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teamResponse] = await Promise.all([
          api.get('teachers/'),
        ]);

        setTeam(teamResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>No Data Found.</div>
  }

  return (
    <>
      <Back title='Team' />
      <section className='team padding'>
        <div className='container grid'>
          {
            team.map((t) => <TeamCard team={t} key={t.id} />)
          }
        </div>
      </section>
    </>
  )
}

export default Team
