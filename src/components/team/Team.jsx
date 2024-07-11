import TeamCard from "./TeamCard"
import Loader from "../loader/Loader"
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

  if (error) {
    return <div>No Data Found.</div>
  }

  return (
    <>
      <section className='team padding'>
        {
          loading && <Loader />
        }
        <div className='container grid'>
          {
            team?.map((t) => <TeamCard team={t} key={t.id} />)
          }
        </div>
      </section>
    </>
  )
}

export default Team
