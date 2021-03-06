import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { getRepos } from "../../action/profile";

const ProfileGithub = ({ getRepos, username, repos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Gitub Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => {
          return (
            <div key={repo.id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazer_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return { repos: state.profile.repos };
};
export default connect(mapStatetoProps, { getRepos })(ProfileGithub);
