import { useEffect } from "react";
import styled from "styled-components";
import useGetUserInfos from "../../Requests/useGetUserInfos";

import Loader from "react-loader-spinner";
import dayjs from "dayjs";

import { MdGpsFixed as GpsIcon, MdBusinessCenter as BusinessIcon, MdWebAsset as WebIcon } from "react-icons/md";
import { FiTwitter as TwitterIcon } from "react-icons/fi";

export default function UserInfos({ userName }) {
	const { loading, error, data, fetchData } = useGetUserInfos(userName);

	useEffect(() => {
		fetchData();
	}, [userName]);

	function formatDate(date) {
		return dayjs(date).format("DD/MM/YYYY");
	}

	function existingValue(value) {
		return value || <span>Não informado</span>;
	}

	if (loading) {
		return <Loader type="Puff" color="#000000" height={300} width={300} timeout={3000} />;
	}
	if (error) return <h3>Usuário não encontrado!</h3>;

	const { name, avatar_url, location, blog, public_repos, created_at, updated_at, company, twitter, bio } = data;

	return (
		<UserInfosContainer>
			<PessoalInfos>
				<strong>{name}</strong>
				<div>
					<img src={avatar_url} alt="User avatar" />
					<p>{existingValue(bio)}</p>
				</div>
			</PessoalInfos>

			<p>
				<GpsIcon /> Endereço: {existingValue(location)}
			</p>
			<p>
				<TwitterIcon /> Twitter: {existingValue(twitter)}
			</p>
			<p>
				<BusinessIcon /> Empresa atual: {existingValue(company)}
			</p>
			<p>
				<WebIcon /> Site pessoal: {existingValue(blog)}
			</p>

			<GitHubInfos>
				<p>
					Conta criada em {formatDate(created_at)} sendo a ultima alteração no dia {formatDate(updated_at)}.
				</p>
				<p>O usuário possui {public_repos} repositórios públicos</p>{" "}
				{/* botão que liste abaixo os repositórios com nome, descrição e clicáveis para acessar o repositório no github */}
			</GitHubInfos>
		</UserInfosContainer>
	);
}

const UserInfosContainer = styled.div`
	padding: 50px;

	span {
		color: gray;
	}
	strong {
		font-size: 20px;
	}
`;

const PessoalInfos = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px;
	div {
		display: flex;
		align-items: center;
		img {
			border-radius: 50%;
			width: 120px;
			margin-right: 20px;
		}
	}
`;

const GitHubInfos = styled.div`
	margin-top: 20px;
`;